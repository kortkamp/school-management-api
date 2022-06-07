import { IExamResult } from '@modules/exams/models/IExamResult';
import { User } from '@modules/users/infra/typeorm/models/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exam } from './Exam';

@Entity('exam_results')
class ExamResult implements IExamResult {
  @PrimaryColumn()
  exam_id: string;

  @PrimaryColumn()
  student_id: string;

  @Column()
  value: number;

  @ManyToOne(() => User, student => student)
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  student: User;

  @ManyToOne(() => Exam, exam => exam)
  @JoinColumn({ name: 'exam_id', referencedColumnName: 'id' })
  exam: Exam;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { ExamResult };
