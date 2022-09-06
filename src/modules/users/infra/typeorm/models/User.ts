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

  @Column('varchar')
  name: string;

  @Column('varchar')
  enroll_id?: string;

  @Column('varchar')
  CPF?: string;

  @Column('varchar')
  phone?: string;

  @Column('char')
  sex: 'M' | 'F';

  @Column()
  birth: Date;

  @Column('uuid')
  segment_id?: string;

  @Column('uuid')
  grade_id?: string;

  @Column('uuid')
  class_group_id?: string;

  @Column('uuid')
  address_id?: string;

  @ManyToOne(() => Address, address => address, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address?: Address;

  @ManyToOne(() => Segment, segment => segment)
  @JoinColumn({ name: 'segment_id', referencedColumnName: 'id' })
  segment: Segment;

  @ManyToOne(() => Grade, grade => grade)
  @JoinColumn({ name: 'grade_id', referencedColumnName: 'id' })
  grade: Grade;

  @ManyToOne(() => ClassGroup, classGroup => classGroup)
  @JoinColumn({ name: 'class_group_id', referencedColumnName: 'id' })
  classGroup: ClassGroup;

  @OneToMany(type => ExamResult, results => results.student, {})
  @JoinColumn({ name: 'id' })
  results: ExamResult[];

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

  @ManyToMany(type => ClassGroup, classGroup => classGroup.teachers)
  @JoinTable({
    name: 'teacher_classes',
    joinColumn: {
      name: 'teacher_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'class_group_id',
      referencedColumnName: 'id',
    },
  })
  teachingClasses: ClassGroup[];

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
