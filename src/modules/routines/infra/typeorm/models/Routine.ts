import { DayTime, IRoutine } from '@modules/routines/models/IRoutine';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { RoutineSubject } from './RoutineSubject';

@Entity('routines')
class Routine implements IRoutine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  school_id: string;

  @Column({ type: 'enum', enum: DayTime })
  day_time: DayTime;

  @Column()
  start_at: string;

  @Column()
  end_at: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    type => RoutineSubject,
    routineSubjects => routineSubjects.routine,
    {},
  )
  @JoinColumn({ name: 'id' })
  routineSubjects: RoutineSubject[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Routine };
