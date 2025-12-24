import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Therapist } from '../common/interfaces/therapist.interface';
import { QuerySpecialistsDto } from './dto/query-specialists.dto';
import { CreateTherapistDto } from './dto/create-therapist.dto';
import { UpdateTherapistDto } from './dto/update-therapist.dto';

export interface GetSpecialistsResponse {
  data: Therapist[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Cache configuration constants
const CACHE_TTL_MS = 60 * 1000; // 1 minute
const CACHE_MAX_ENTRIES = 100;
const CACHE_CLEANUP_INTERVAL_MS = 30 * 1000; // 30 seconds

@Injectable()
export class SpecialistsService implements OnModuleInit, OnModuleDestroy {
  private queryCache: Map<string, {
    data: GetSpecialistsResponse | number;
    timestamp: number;
  }> = new Map();
  
  private readonly QUERY_CACHE_TTL = CACHE_TTL_MS;
  private readonly MAX_CACHE_SIZE = CACHE_MAX_ENTRIES;
  private cleanupInterval?: NodeJS.Timeout;

  constructor(private readonly databaseService: DatabaseService) {}

  onModuleInit() {
    this.cleanupInterval = setInterval(() => this.cleanExpiredCache(), CACHE_CLEANUP_INTERVAL_MS);
  }

  onModuleDestroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }

  private generateCacheKey(query: QuerySpecialistsDto, type: 'list' | 'count' = 'list'): string {
    return `${type}:${JSON.stringify(query)}`;
  }

  private getCachedResult<T>(cacheKey: string): T | null {
    const cached = this.queryCache.get(cacheKey);
    
    if (!cached) {
      return null;
    }

    const now = Date.now();
    const age = now - cached.timestamp;

    if (age > this.QUERY_CACHE_TTL) {
      // Cache expired
      this.queryCache.delete(cacheKey);
      return null;
    }

    return cached.data as T;
  }

  private setCachedResult(cacheKey: string, data: GetSpecialistsResponse | number): void {
    // LRU: if cache is full, remove oldest entry
    if (this.queryCache.size >= this.MAX_CACHE_SIZE) {
      const oldestKey = this.queryCache.keys().next().value;
      this.queryCache.delete(oldestKey);
    }

    this.queryCache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });
  }

  private clearQueryCache(): void {
    this.queryCache.clear();
  }

  private cleanExpiredCache(): void {
    const now = Date.now();

    for (const [key, value] of this.queryCache.entries()) {
      if (now - value.timestamp > this.QUERY_CACHE_TTL) {
        this.queryCache.delete(key);
      }
    }
  }


  private async getBaseDataset(query: QuerySpecialistsDto): Promise<Therapist[]> {
    if (query.gender === 'man' || query.gender === 'woman') {
      return await this.databaseService.getTherapistsByGender(query.gender);
    }

    // Otherwise get all data
    return await this.databaseService.getTherapists();
  }

  private filterTherapists(therapists: Therapist[], query: QuerySpecialistsDto): Therapist[] {
    return therapists.filter((therapist) => {
      if (query.priceMin !== undefined && query.priceMin !== null && therapist.price < query.priceMin) {
        return false;
      }
      if (query.priceMax !== undefined && query.priceMax !== null && therapist.price > query.priceMax) {
        return false;
      }

      // Age filter
      if (query.ageMin !== undefined && query.ageMin !== null && therapist.age && therapist.age < query.ageMin) {
        return false;
      }
      if (query.ageMax !== undefined && query.ageMax !== null && therapist.age && therapist.age > query.ageMax) {
        return false;
      }

      return true;
    });
  }

  async findAll(query: QuerySpecialistsDto): Promise<GetSpecialistsResponse> {
    const cacheKey = this.generateCacheKey(query, 'list');
    const cached = this.getCachedResult<GetSpecialistsResponse>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const baseDataset = await this.getBaseDataset(query);
    
    // Filtering
    const filtered = this.filterTherapists(baseDataset, query);

    const total = filtered.length;
    const page = query.page || 1;
    const limit = query.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const data = filtered.slice(startIndex, endIndex);
    const hasMore = endIndex < total;

    const result: GetSpecialistsResponse = {
      data,
      total,
      page,
      limit,
      hasMore,
    };

    // Save to cache
    this.setCachedResult(cacheKey, result);

    return result;
  }

  async getCount(query: QuerySpecialistsDto): Promise<number> {
    // Check cache
    const cacheKey = this.generateCacheKey(query, 'count');
    const cached = this.getCachedResult<number>(cacheKey);
    
    if (cached !== null) {
      return cached;
    }

    // Use indexes
    const baseDataset = await this.getBaseDataset(query);
    const filtered = this.filterTherapists(baseDataset, query);
    const count = filtered.length;

    // Save to cache
    this.setCachedResult(cacheKey, count);

    return count;
  }

  async findOne(id: number): Promise<Therapist | null> {
    // Use ID index (O(1) lookup)
    const therapist = await this.databaseService.getTherapistById(id);
    return therapist || null;
  }

  async create(createDto: CreateTherapistDto): Promise<Therapist> {
    const result = await this.databaseService.createTherapist(createDto);
    this.clearQueryCache();
    return result;
  }

  async update(id: number, updateDto: UpdateTherapistDto): Promise<Therapist | null> {
    const result = await this.databaseService.updateTherapist(id, updateDto);
    this.clearQueryCache();
    return result;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.databaseService.deleteTherapist(id);
    this.clearQueryCache();
    return result;
  }
}

