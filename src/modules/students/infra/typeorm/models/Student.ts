import { ClassGroup } from '@modules/classGroups/infra/typeorm/models/ClassGroup';
import { Course } from '@modules/courses/infra/typeorm/models/Course';
import { Grade } from '@modules/grades/infra/typeorm/models/Grade';
import { Person } from '@modules/persons/infra/typeorm/models/Person';
import { IStudent } from '@modules/students/models/IStudent';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('smsystem.students')
class Student implements IStudent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  person_id: string;

  @Column('uuid')
  school_id: string;

  @Column('varchar')
  enroll_id?: string;

  @Column('uuid')
  course_id?: string;

  @Column('uuid')
  grade_id?: string;

  @Column('uuid')
  class_group_id?: string;

  @ManyToOne(() => Person, person => person, { cascade: ['insert'] })
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: Person;

  @ManyToOne(() => Course, course => course)
  @JoinColumn({ name: 'course_id', referencedColumnName: 'id' })
  course: Course;

  @ManyToOne(() => Grade, grade => grade)
  @JoinColumn({ name: 'grade_id', referencedColumnName: 'id' })
  grade: Grade;

  @ManyToOne(() => ClassGroup, classGroup => classGroup)
  @JoinColumn({ name: 'class_group_id', referencedColumnName: 'id' })
  classGroup: ClassGroup;

  @Column('boolean')
  active: boolean;

  @Column()
  tenant_id: string;

  @CreateDateColumn()
  enroll_date: string;

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

export { Student };
