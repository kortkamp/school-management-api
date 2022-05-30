import { Role } from '@modules/roles/infra/typeorm/models/Role';
import { Subject } from '@modules/subjects/infra/typeorm/models/Subject';
import { IUser } from '@modules/users/models/IUser';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  name: string;

  @Column('uuid')
  role_id: string;

  @Column('uuid')
  school_id?: string;

  @ManyToOne(() => Role, role => role)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role;

  @ManyToMany(type => Subject, subject => subject.users)
  @JoinTable({
    name: 'user_subjects',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'subject_id',
      referencedColumnName: 'id',
    },
  })
  subjects: Subject[];

  @Column('varchar')
  @Exclude()
  password: string;

  @Column('boolean')
  active: boolean;

  @Column('varchar')
  avatar?: string;

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

export { User };
