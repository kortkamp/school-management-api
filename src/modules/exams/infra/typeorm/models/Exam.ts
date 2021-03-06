import { ClassGroup } from '@modules/classGroups/infra/typeorm/models/ClassGroup';
import {
  examStatus,
  examSubType,
  examType,
  IExam,
} from '@modules/exams/models/IExam';
import { Subject } from '@modules/subjects/infra/typeorm/models/Subject';
import { Term } from '@modules/terms/infra/typeorm/models/Term';
import { User } from '@modules/users/infra/typeorm/models/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { ExamResult } from './ExamResult';

@Entity('exams')
class Exam implements IExam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  type: examType;

  @Column('varchar')
  sub_type: examSubType;

  @Column('uuid')
  reference_id?: string;

  @Column('varchar')
  status: examStatus;

  @Column()
  value: number;

  @Column()
  weight: number;

  @Column()
  term_id: string;

  @ManyToOne(() => Term, term => term)
  @JoinColumn({ name: 'term_id', referencedColumnName: 'id' })
  term: Term;

  @Column()
  teacher_id: string;

  @ManyToOne(() => User, teacher => teacher)
  @JoinColumn({ name: 'teacher_id', referencedColumnName: 'id' })
  teacher: User;

  @Column()
  subject_id: string;

  @ManyToOne(() => Subject, subject => subject)
  @JoinColumn({ name: 'subject_id', referencedColumnName: 'id' })
  subject: Subject;

  @Column()
  class_id: string;

  @ManyToOne(() => ClassGroup, class_group => class_group)
  @JoinColumn({ name: 'class_id', referencedColumnName: 'id' })
  class_group: ClassGroup;

  @OneToMany(type => ExamResult, examResult => examResult.exam, {})
  @JoinColumn({ name: 'id' })
  results: ExamResult[];

  @Column()
  date: Date;

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

export { Exam };
