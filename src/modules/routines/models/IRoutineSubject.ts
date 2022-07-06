interface IRoutineSubject {
  id: string;

  routine_id: string;

  subject_id: string;

  class_group_id: string;

  week_day: number;

  created_at: Date;
}

export { IRoutineSubject };
