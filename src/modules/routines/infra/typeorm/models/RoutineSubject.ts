import { IRoutineSubject } from '@modules/routines/models/IRoutineSubject';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('routine_subjects')
class RoutineSubject implements IRoutineSubject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  routine_id: string;

  @Column()
  subject_id: string;

  @Column()
  class_group_id: string;

  @Column()
  week_day: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { RoutineSubject };
