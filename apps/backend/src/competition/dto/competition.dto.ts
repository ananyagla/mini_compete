import { IsString, IsArray, IsInt, IsDateString, IsOptional } from 'class-validator';

export class CreateCompetitionDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsInt()
  capacity: number;

  @IsDateString()
  regDeadline: string;
}
