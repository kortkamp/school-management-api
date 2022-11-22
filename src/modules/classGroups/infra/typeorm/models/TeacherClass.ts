import { ITeacherClass } from '@modules/classGroups/models/ITeacherClass';
import { RoutineSubject } from '@modules/routines/infra/typeorm/models/RoutineSubject';
import { Subject } from '@modules/subjects/infra/typeorm/models/Subject';
import { Teacher } from '@modules/teachers/infra/typeorm/models/Teacher';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { ClassGroup } from './ClassGroup';

@Entity('periodic.teacher_classes')
class TeacherClass implements ITeacherClass {
  @Column()
  id: string;

  @PrimaryColumn()
  teacher_id: string;

  @PrimaryColumn()
  class_group_id: string;

  @PrimaryColumn()
  subject_id: string;

  @Column()
  school_id: string;

  @ManyToOne(() => Teacher, teacher => teacher)
  @JoinColumn({ name: 'teacher_id', referencedColumnName: 'id' })
  teacher: Teacher;

  @ManyToOne(() => ClassGroup, classGroup => classGroup)
  @JoinColumn({ name: 'class_group_id', referencedColumnName: 'id' })
  classGroup: ClassGroup;

  @ManyToOne(() => Subject, subject => subject)
  @JoinColumn({ name: 'subject_id', referencedColumnName: 'id' })
  subject: Subject;

  @OneToMany(type => RoutineSubject, routines => routines.teacherClassGroup, {
    cascade: true,
  })
  @JoinColumn({ name: 'id' })
  routines: RoutineSubject[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { TeacherClass };
