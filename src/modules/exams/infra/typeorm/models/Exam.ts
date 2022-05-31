import { ClassGroup } from '@modules/classGroups/infra/typeorm/models/ClassGroup';
import { IExam } from '@modules/exams/models/IExam';
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

@Entity('exams')
class Exam implements IExam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  value: number;

  @Column()
  weight: number;

  @Column()
  teacher_id: string;

  @Column()
  subject_id: string;

  @Column()
  class_id: string;

  @ManyToOne(() => ClassGroup, class_group => class_group)
  @JoinColumn({ name: 'class_id', referencedColumnName: 'id' })
  class_group: ClassGroup;

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
