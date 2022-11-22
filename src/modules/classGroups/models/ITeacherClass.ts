import { IRoutineSubject } from '@modules/routines/models/IRoutineSubject';

interface ITeacherClass {
  id: string;

  teacher_id: string;

  class_group_id: string;

  subject_id: string;

  school_id: string;

  routines: IRoutineSubject[];

  created_at: Date;
}

export { ITeacherClass };
