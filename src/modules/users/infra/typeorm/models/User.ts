import { Address } from '@modules/addresses/infra/typeorm/models/Address';
import { ClassGroup } from '@modules/classGroups/infra/typeorm/models/ClassGroup';
import { ExamResult } from '@modules/exams/infra/typeorm/models/ExamResult';
import { Grade } from '@modules/grades/infra/typeorm/models/Grade';
import { Segment } from '@modules/segments/infra/typeorm/models/Segment';
import { Subject } from '@modules/subjects/infra/typeorm/models/Subject';
import { IUser } from '@modules/users/models/IUser';
import { Exclude, Expose } from 'class-transformer';
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
  OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { UserSchoolRole } from './UserSchoolRole';

@Entity('users')
class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  email: string;

  @Column('integer')
  number_id: number;

  @Column('varchar')
  name: string;

  @OneToMany(type => UserSchoolRole, userSchoolRole => userSchoolRole.user, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'id' })
  userSchoolRoles: UserSchoolRole[];

  @Column('varchar')
  @Exclude()
  password: string;

  @Column('boolean')
  active: boolean;

  @Column('varchar')
  avatar?: string;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    const avatarURL = process.env.AVATAR_URL;
    return avatarURL + this.avatar;
  }

  @Column('uuid')
  tenant_id: string;

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
