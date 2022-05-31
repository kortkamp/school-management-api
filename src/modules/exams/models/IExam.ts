interface IExam {
  id: string;

  type: string;

  value: number;

  weight: number;

  teacher_id: string;

  subject_id: string;

  class_id: string;

  date: Date;

  created_at: Date;

  updated_at: Date;
}

export { IExam };
