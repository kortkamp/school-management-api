import {
  IUserSubject,
  IUserSubjectType,
} from '@modules/subjects/models/IUserSubject';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('user_subjects')
class UserSubject implements IUserSubject {
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  subject_id: string;

  @Column({ type: 'enum', enum: IUserSubjectType })
  type: IUserSubjectType;

  @CreateDateColumn()
  created_at: Date;
}

export { UserSubject };
