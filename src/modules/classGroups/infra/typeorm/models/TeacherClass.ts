import { ITeacherClass } from '@modules/classGroups/models/ITeacherClass';
import { Subject } from '@modules/subjects/infra/typeorm/models/Subject';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { ClassGroup } from './ClassGroup';

@Entity('teacher_classes')
class TeacherClass implements ITeacherClass {
  @PrimaryColumn()
  teacher_id: string;

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

  @CreateDateColumn()
  created_at: Date;
}

export { TeacherClass };
