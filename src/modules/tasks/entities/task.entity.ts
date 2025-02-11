import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { Todo } from '../../todo/entities/todo.entity';
import { IsEnum, IsDateString } from 'class-validator';

export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'datetime' })
  @IsDateString()
  dueDate: Date;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ManyToOne(() => Todo, (todo) => todo.tasks, { onDelete: 'CASCADE' })
  todo: Todo;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
