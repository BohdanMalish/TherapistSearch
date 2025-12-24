import {
  IsString,
  IsBoolean,
  IsNumber,
  IsArray,
  IsOptional,
  IsEnum,
  Min,
  Max,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateTherapistDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsBoolean()
  verified: boolean;

  @IsBoolean()
  superSpecialist: boolean;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsNumber()
  @Min(0)
  reviews: number;

  @IsNumber()
  @Min(1)
  duration: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  experience: number;

  @IsNumber()
  @Min(0)
  clients: number;

  @IsNumber()
  @Min(0)
  sessions: number;

  @IsString()
  image: string;

  @IsArray()
  @IsString({ each: true })
  availableSlots: string[];

  @IsBoolean()
  isFavorite: boolean;

  @IsOptional()
  @IsNumber()
  @Min(18)
  @Max(100)
  age?: number;

  @IsOptional()
  @IsEnum(['man', 'woman'])
  gender?: 'man' | 'woman';
}

