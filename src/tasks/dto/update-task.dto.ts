import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'nueva tarea 1' })
  @IsString()
  @IsOptional()
  title: string;

  @ApiPropertyOptional({ example: 'nueva decripción 1' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  completed: boolean;
}
