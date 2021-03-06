import { ClassGroup } from '@modules/classGroups/infra/typeorm/models/ClassGroup';
import { ExamResult } from '@modules/exams/infra/typeorm/models/ExamResult';
import { Grade } from '@modules/grades/infra/typeorm/models/Grade';
import { Role } from '@modules/roles/infra/typeorm/models/Role';
import { Segment } from '@modules/segments/infra/typeorm/models/Segment';
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
  OneToMany,
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
  role_id: string;

  @Column('uuid')
  school_id?: string;

  @Column('uuid')
  segment_id?: string;

  @Column('uuid')
  grade_id?: string;

  @Column('uuid')
  class_group_id?: string;

  @ManyToOne(() => Segment, segment => segment)
  @JoinColumn({ name: 'segment_id', referencedColumnName: 'id' })
  segment: Segment;

  @ManyToOne(() => Grade, grade => grade)
  @JoinColumn({ name: 'grade_id', referencedColumnName: 'id' })
  grade: Grade;

  @ManyToOne(() => ClassGroup, classGroup => classGroup)
  @JoinColumn({ name: 'class_group_id', referencedColumnName: 'id' })
  classGroup: ClassGroup;

  @ManyToOne(() => Role, role => role)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role;

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
