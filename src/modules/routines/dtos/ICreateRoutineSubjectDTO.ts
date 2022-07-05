import { WeekDay } from '../models/IRoutineSubject';

interface ICreateRoutineSubjectDTO {
  routine_id: string;

  subject_id: string;

  class_group_id: string;

  week_day: WeekDay;
}

export { ICreateRoutineSubjectDTO };
