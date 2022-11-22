import { TeacherClass } from '@modules/classGroups/infra/typeorm/models/TeacherClass';
import { IRoutineSubject } from '@modules/routines/models/IRoutineSubject';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('periodic.routine_subjects')
class RoutineSubject implements IRoutineSubject {
  @PrimaryColumn()
  routine_id: string;

  @PrimaryColumn()
  week_day: number;

  @PrimaryColumn()
  teacher_class_group_id: string;

  @Column()
  school_id: string;

  @ManyToOne(() => TeacherClass, teacherClassGroup => teacherClassGroup, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'teacher_class_group_id', referencedColumnName: 'id' })
  teacherClassGroup: TeacherClass;

  @CreateDateColumn()
  created_at: Date;
}

export { RoutineSubject };
