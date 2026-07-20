import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  title!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  batchName!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  subject!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  level!: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;
}
