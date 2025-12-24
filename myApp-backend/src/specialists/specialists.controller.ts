import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { SpecialistsService } from './specialists.service';
import { QuerySpecialistsDto } from './dto/query-specialists.dto';
import { CreateTherapistDto } from './dto/create-therapist.dto';
import { UpdateTherapistDto } from './dto/update-therapist.dto';

@Controller('api/specialists')
export class SpecialistsController {
  constructor(private readonly specialistsService: SpecialistsService) {}

  @Get()
  async findAll(@Query() query: QuerySpecialistsDto) {
    return await this.specialistsService.findAll(query);
  }

  @Get('count')
  async getCount(@Query() query: QuerySpecialistsDto) {
    const totalCount = await this.specialistsService.getCount(query);
    return { totalCount };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const therapist = await this.specialistsService.findOne(id);
    
    if (!therapist) {
      throw new HttpException('Therapist not found', HttpStatus.NOT_FOUND);
    }

    return therapist;
  }

  @Post()
  async create(@Body() createDto: CreateTherapistDto) {
    return await this.specialistsService.create(createDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTherapistDto,
  ) {
    const therapist = await this.specialistsService.update(id, updateDto);
    
    if (!therapist) {
      throw new HttpException('Therapist not found', HttpStatus.NOT_FOUND);
    }

    return therapist;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.specialistsService.remove(id);
    
    if (!deleted) {
      throw new HttpException('Therapist not found', HttpStatus.NOT_FOUND);
    }

    return { message: 'Therapist deleted successfully' };
  }
}

