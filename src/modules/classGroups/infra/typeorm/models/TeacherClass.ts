import { ITeacherClass } from '@modules/classGroups/models/ITeacherClass';
import { Subject } from '@modules/subjects/infra/typeorm/models/Subject';
import { Teacher } from '@modules/teachers/infra/typeorm/models/Teacher';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { ClassGroup } from './ClassGroup';

@Entity('periodic.teacher_classes')
class TeacherClass implements ITeacherClass {
  @PrimaryColumn()
  teacher_id: string;

  @ManyToOne(() => Teacher, teacher => teacher)
  @JoinColumn({ name: 'teacher_id', referencedColumnName: 'id' })
  teacher: Teacher;

  @PrimaryColumn()
  class_group_id: string;

  @ManyToOne(() => ClassGroup, classGroup => classGroup)
  @JoinColumn({ name: 'class_group_id', referencedColumnName: 'id' })
  classGroup: ClassGroup;

  @PrimaryColumn()
  subject_id: string;

  @ManyToOne(() => Subject, subject => subject)
  @JoinColumn({ name: 'subject_id', referencedColumnName: 'id' })
  subject: Subject;

  @Column()
  school_id: string;

  @CreateDateColumn()
  created_at: Date;
}

export { TeacherClass };
