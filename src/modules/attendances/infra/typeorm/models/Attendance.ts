import { ClassGroup } from '@modules/classGroups/infra/typeorm/models/ClassGroup';
import { attendanceStatus, attendanceType, IAttendance } from '@modules/attendances/models/IAttendance';
import { School } from '@modules/schools/infra/typeorm/models/School';
import { Subject } from '@modules/subjects/infra/typeorm/models/Subject';
import { Teacher } from '@modules/teachers/infra/typeorm/models/Teacher';
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

import { AttendanceResult } from './AttendanceResult';

@Entity('periodic.attendances')
class Attendance implements IAttendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  type: attendanceType;

  @Column('varchar')
  status: attendanceStatus;

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

  @ManyToOne(() => Teacher, teacher => teacher)
  @JoinColumn({ name: 'teacher_id', referencedColumnName: 'id' })
  teacher: Teacher;

  @Column()
  subject_id: string;

  @ManyToOne(() => Subject, subject => subject)
  @JoinColumn({ name: 'subject_id', referencedColumnName: 'id' })
  subject: Subject;

  @Column()
  class_group_id: string;

  @ManyToOne(() => ClassGroup, class_group => class_group)
  @JoinColumn({ name: 'class_group_id', referencedColumnName: 'id' })
  class_group: ClassGroup;

  @OneToMany(type => AttendanceResult, attendanceResult => attendanceResult.attendance, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'id' })
  results: AttendanceResult[];

  @Column()
  date: Date;

  @Column()
  school_id: string;

  @ManyToOne(() => School, school => school)
  @JoinColumn({ name: 'school_id', referencedColumnName: 'id' })
  school: School;

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

export { Attendance };
