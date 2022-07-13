interface IRoutineSubject {
  routine_id: string;

  subject_id: string;

  class_group_id: string;

  teacher_id: string;

  week_day: number;

  created_at: Date;
}

export { IRoutineSubject };
