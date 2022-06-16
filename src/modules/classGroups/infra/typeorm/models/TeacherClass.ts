import { ITeacherClass } from '@modules/classGroups/models/ITeacherClass';
import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('teacher_classes')
class TeacherClass implements ITeacherClass {
  @PrimaryColumn()
  teacher_id: string;

  @PrimaryColumn()
  class_group_id: string;

  @PrimaryColumn()
  subject_id: string;

  @CreateDateColumn()
  created_at: Date;
}

export { TeacherClass };
