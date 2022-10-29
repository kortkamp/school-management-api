import {
  IUserSubject,
  IUserSubjectType,
} from '@modules/subjects/models/IUserSubject';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Subject } from './Subject';

@Entity('smsystem.user_subjects')
class UserSubject implements IUserSubject {
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  subject_id: string;

  @ManyToOne(() => Subject, subject => subject)
  @JoinColumn({ name: 'subject_id', referencedColumnName: 'id' })
  subject: Subject;

  @Column({ type: 'enum', enum: IUserSubjectType })
  type: IUserSubjectType;

  @CreateDateColumn()
  created_at: Date;
}

export { UserSubject };
