import { IAttendanceResult } from '@modules/attendances/models/IAttendanceResult';
import { Student } from '@modules/students/infra/typeorm/models/Student';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Attendance } from './Attendance';

@Entity('periodic.attendance_results')
class AttendanceResult implements IAttendanceResult {
  @PrimaryColumn()
  attendance_id: string;

  @PrimaryColumn()
  student_id: string;

  @Column()
  achievement: number;

  @ManyToOne(() => Student, student => student)
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  student: Student;

  @ManyToOne(() => Attendance, attendance => attendance)
  @JoinColumn({ name: 'attendance_id', referencedColumnName: 'id' })
  attendance: Attendance;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { AttendanceResult };
