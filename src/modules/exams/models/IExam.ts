/* eslint-disable @typescript-eslint/naming-convention */
export enum examStatus {
  OPEN = 'open',
  PARTIAL = 'partial',
  CLOSED = 'closed',
}

export enum examType {
  EXAM = 'prova',
  WORK = 'trabalho',
  PRESENTATION = 'seminário',
  EXERCISE = 'exercício',
  BEHAVIOR = 'comportamento',
  OTHER = 'outros',
}

export interface IExam {
  id: string;

  type: examType;

  status: examStatus;

  value: number;

  weight: number;

  term_id: string;

  teacher_id: string;

  subject_id: string;

  class_group_id: string;

  date: Date;

  school_id: string;

  created_at: Date;

  updated_at: Date;
}
