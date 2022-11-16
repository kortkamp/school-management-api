interface IRoutineSubject {
  routine_id: string;

  week_day: number;

  subject_id: string;

  teacher_id?: string;

  class_group_id: string;

  school_id: string;

  created_at: Date;
}

export { IRoutineSubject };
