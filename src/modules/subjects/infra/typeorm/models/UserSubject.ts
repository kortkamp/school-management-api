import { IUserSubject } from '@modules/subjects/models/IUserSubject';
import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('user_subjects')
class UserSubject implements IUserSubject {
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  subject_id: string;

  @CreateDateColumn()
  created_at: Date;
}

export { UserSubject };
