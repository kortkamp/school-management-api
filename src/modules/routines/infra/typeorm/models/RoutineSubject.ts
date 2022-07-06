import { IRoutineSubject } from '@modules/routines/models/IRoutineSubject';
import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('routine_subjects')
class RoutineSubject implements IRoutineSubject {
  @PrimaryColumn()
  routine_id: string;

  @PrimaryColumn()
  subject_id: string;

  @PrimaryColumn()
  class_group_id: string;

  @PrimaryColumn()
  week_day: number;

  @CreateDateColumn()
  created_at: Date;
}

export { RoutineSubject };
