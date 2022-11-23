import { ICreateRoutineSubjectDTO } from '@modules/routines/dtos/ICreateRoutineSubjectDTO';

interface ICreateTeacherClassDTO {
  teacher_id: string;
  class_group_id: string;
  subject_id: string;
  school_id: string;
  routines?: ICreateRoutineSubjectDTO[];
}

export { ICreateTeacherClassDTO };
