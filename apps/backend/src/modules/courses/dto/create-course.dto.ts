import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  title!: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;
}
