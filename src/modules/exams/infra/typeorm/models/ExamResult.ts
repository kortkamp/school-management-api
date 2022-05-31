import { IExamResult } from '@modules/exams/models/IExamResult';
import { User } from '@modules/users/infra/typeorm/models/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Exam } from './Exam';

@Entity('exam_results')
class ExamResult implements IExamResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: number;

  @Column()
  student_id: string;

  @ManyToOne(() => User, student => student)
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  student: User;

  @Column()
  exam_id: string;

  @ManyToOne(() => Exam, exam => exam)
  @JoinColumn({ name: 'exam_id', referencedColumnName: 'id' })
  exam: Exam;

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

export { ExamResult };
