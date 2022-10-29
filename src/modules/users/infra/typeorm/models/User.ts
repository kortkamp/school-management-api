import { Person } from '@modules/persons/infra/typeorm/models/Person';
import { IUser } from '@modules/users/models/IUser';
import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
  OneToOne,
  Generated,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { UserSchoolRole } from './UserSchoolRole';

@Entity('users')
class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  email: string;

  @Generated('increment')
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
  person_id: string;

  @OneToOne(() => Person, person => person)
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: Person;

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
