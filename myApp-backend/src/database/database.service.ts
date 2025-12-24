import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import { join } from 'path';
import { DatabaseSchema, Therapist } from '../common/interfaces/therapist.interface';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);
  private db: lowdb.LowdbSync<DatabaseSchema>;

  private therapistsCache: Therapist[] = [];
  private idCounter: number = 0;

  private idIndex: Map<number, Therapist> = new Map();
  
 
  private genderIndex: Map<'man' | 'woman', Therapist[]> = new Map([
    ['man', []],
    ['woman', []]
  ]);

  async onModuleInit() {
    try {
      const file = join(process.cwd(), 'db.json');
      this.logger.log(`Initializing database: ${file}`);
      
      const adapter = new FileSync<DatabaseSchema>(file);
      this.db = lowdb(adapter);

      this.db.defaults({ therapists: [] }).write();

      this.initializeCache();
      
      const therapists = this.db.get('therapists').value();
      this.idCounter = therapists.length > 0 
        ? Math.max(...therapists.map((t) => t.id)) 
        : 0;
      
      this.logger.log(`Database initialized. Records: ${therapists.length}, Next ID: ${this.idCounter + 1}`);
    } catch (error) {
      this.logger.error('Failed to initialize database', error);
      throw new Error(
        `Database initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}. ` +
        'Check file permissions and disk space.'
      );
    }
  }

 
  private initializeCache(): void {
    this.therapistsCache = this.db.get('therapists').value();
    this.buildIndexes();
  }

  private buildIndexes(): void {
    this.idIndex.clear();
    this.genderIndex.set('man', []);
    this.genderIndex.set('woman', []);

    for (const therapist of this.therapistsCache) {
      this.idIndex.set(therapist.id, therapist);
      
      if (therapist.gender === 'man' || therapist.gender === 'woman') {
        this.genderIndex.get(therapist.gender)!.push(therapist);
      }
    }
  }


  async getTherapists(): Promise<Therapist[]> {
    return [...this.therapistsCache];
  }

  async getTherapistById(id: number): Promise<Therapist | undefined> {
    return this.idIndex.get(id);
  }

  async getTherapistsByGender(gender: 'man' | 'woman'): Promise<Therapist[]> {
    const result = this.genderIndex.get(gender) || [];
    return [...result];
  }

 
  async createTherapist(therapist: Omit<Therapist, 'id'>): Promise<Therapist> {
    // Note: In production, would use UUID or database-generated IDs
    // to avoid race conditions with concurrent requests
    this.idCounter++;
    const newTherapist: Therapist = { ...therapist, id: this.idCounter };
    
    this.db.get('therapists').push(newTherapist).write();
    this.refreshCache();
    return newTherapist;
  }

  async updateTherapist(id: number, updates: Partial<Therapist>): Promise<Therapist | null> {
    const therapist = this.db.get('therapists').find({ id }).value();
    if (!therapist) return null;

    const updated = { ...therapist, ...updates, id };
    this.db.get('therapists').find({ id }).assign(updated).write();
    this.refreshCache();
    
    return this.db.get('therapists').find({ id }).value();
  }

  async deleteTherapist(id: number): Promise<boolean> {
    const therapist = this.db.get('therapists').find({ id }).value();
    if (!therapist) return false;

    this.db.get('therapists').remove({ id }).write();
    this.refreshCache();
    
    return true;
  }

  private refreshCache(): void {
    this.therapistsCache = this.db.get('therapists').value();
    this.buildIndexes();
  }
}

