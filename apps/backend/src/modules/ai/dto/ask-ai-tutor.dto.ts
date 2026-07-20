import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class AskAiTutorDto {
  @IsNotEmpty()
  @IsString()
  courseId!: string;

  @IsOptional()
  @IsString()
  lessonId?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2000)
  question!: string;
}
