import { Course } from '@modules/courses/infra/typeorm/models/Course';
import { IGrade } from '@modules/grades/models/IGrade';
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

@Entity('grades')
class Grade implements IGrade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  course_id: string;

  @Column()
  total_hours: number;

  @Column()
  days: number;

  @ManyToOne(() => Course, course => course, { orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'course_id', referencedColumnName: 'id' })
  course: Course;

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

export { Grade };
