import { IsNotEmpty, IsDateString, IsEnum } from 'class-validator';

export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export class CreateTaskDto {
  @IsNotEmpty()
  description: string;

  @IsDateString()
  dueDate: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}
