import { IRoutineSubject } from '@modules/routines/models/IRoutineSubject';
import { Subject } from '@modules/subjects/infra/typeorm/models/Subject';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Routine } from './Routine';

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

  @ManyToOne(() => Routine, routine => routine)
  @JoinColumn({ name: 'routine_id', referencedColumnName: 'id' })
  routine: Routine;

  @ManyToOne(() => Subject, subject => subject)
  @JoinColumn({ name: 'subject_id', referencedColumnName: 'id' })
  subject: Subject;

  @CreateDateColumn()
  created_at: Date;
}

export { RoutineSubject };
