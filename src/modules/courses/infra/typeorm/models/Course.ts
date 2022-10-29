import { ICourse } from '@modules/courses/models/ICourse';
import { Grade } from '@modules/grades/infra/typeorm/models/Grade';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('smsystem.courses')
class Course implements ICourse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  school_id: string;

  @Column()
  name: string;

  @Column()
  segment_id: string;

  @Column()
  total_hours: number;

  @Column()
  phase_name: string;

  @Column()
  phases_number: number;

  @OneToMany(type => Grade, grades => grades.course, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'id' })
  grades: Grade[];

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

export { Course };
