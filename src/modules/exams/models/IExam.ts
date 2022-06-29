export enum examStatus {
  OPEN = 'open',
  PARTIAL = 'partial',
  CLOSED = 'closed',
}

interface IExam {
  id: string;

  type: string;

  status: examStatus;

  value: number;

  weight: number;

  term_id: string;

  teacher_id: string;

  subject_id: string;

  class_id: string;

  date: Date;

  created_at: Date;

  updated_at: Date;
}

export { IExam };
