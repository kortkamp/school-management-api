import { IRoutineGroup } from '@modules/routines/models/IRoutineGroup';
import { School } from '@modules/schools/infra/typeorm/models/School';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Routine } from './Routine';

@Entity('smsystem.routine_groups')
class RoutineGroup implements IRoutineGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  school_id: string;

  @ManyToOne(() => School, school => school)
  @JoinColumn({ name: 'school_id', referencedColumnName: 'id' })
  school: School;

  @OneToMany(type => Routine, routine => routine.routineGroup, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'id' })
  routines: Routine[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { RoutineGroup };
