import { IsOptional, IsInt, Min, Max, IsEnum, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, Validate } from 'class-validator';
import { Type } from 'class-transformer';

@ValidatorConstraint({ name: 'isLessThanOrEqual', async: false })
class IsLessThanOrEqualConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    
    // If either value is not provided, skip validation
    if (value == null || relatedValue == null) {
      return true;
    }
    
    return value <= relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `${args.property} must be less than or equal to ${relatedPropertyName}`;
  }
}

export class QuerySpecialistsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Validate(IsLessThanOrEqualConstraint, ['priceMax'])
  priceMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  priceMax?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(18)
  @Max(100)
  @Validate(IsLessThanOrEqualConstraint, ['ageMax'])
  ageMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(18)
  @Max(100)
  ageMax?: number;

  @IsOptional()
  @IsEnum(['man', 'woman'], { message: 'Gender must be either "man" or "woman"' })
  gender?: 'man' | 'woman';
}

