import { TaskStatus } from './create-task.dto';
import { IsOptional, IsString, IsDate, IsEnum } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  dueDate?: Date;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
