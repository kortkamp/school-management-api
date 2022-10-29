import { IClassGroup } from '@modules/classGroups/models/IClassGroup';
import { Grade } from '@modules/grades/infra/typeorm/models/Grade';
import { RoutineGroup } from '@modules/routines/infra/typeorm/models/RoutineGroup';
import { School } from '@modules/schools/infra/typeorm/models/School';
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

import { TeacherClass } from './TeacherClass';

@Entity('smsystem.class_groups')
class ClassGroup implements IClassGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grade_id: string;

  @Column()
  routine_group_id: string;

  @Column()
  school_id: string;

  @ManyToOne(() => School, school => school)
  @JoinColumn({
    name: 'school_id',
    referencedColumnName: 'id',
  })
  school: School;

  // @OneToMany(type => User, users => users.classGroup, {})
  // @JoinColumn({ name: 'id' })
  // students: User[];

  @OneToMany(
    type => TeacherClass,
    teacherClassGroups => teacherClassGroups.classGroup,
    {},
  )
  @JoinColumn({ name: 'class_group_id' })
  teacherClassGroups: TeacherClass[];

  // @ManyToMany(type => User, user => user.teachingClasses)
  // teachers: User[];

  @ManyToOne(() => Grade, grade => grade, { orphanedRowAction: 'nullify' })
  @JoinColumn({
    name: 'grade_id',
    referencedColumnName: 'id',
  })
  grade: Grade;

  @ManyToOne(() => RoutineGroup, routineGroup => routineGroup, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'routine_group_id', referencedColumnName: 'id' })
  routineGroup: RoutineGroup;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { ClassGroup };
