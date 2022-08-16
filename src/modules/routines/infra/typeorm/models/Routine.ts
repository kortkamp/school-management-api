import { IRoutine } from '@modules/routines/models/IRoutine';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { RoutineGroup } from './RoutineGroup';
import { RoutineSubject } from './RoutineSubject';

@Entity('routines')
class Routine implements IRoutine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  routine_group_id: string;

  @ManyToOne(() => RoutineGroup, routineGroup => routineGroup)
  @JoinColumn({ name: 'routine_group_id', referencedColumnName: 'id' })
  routineGroup: RoutineGroup;

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
