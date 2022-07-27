/* eslint-disable @typescript-eslint/naming-convention */
export enum examStatus {
  OPEN = 'open',
  PARTIAL = 'partial',
  CLOSED = 'closed',
}

export enum examType {
  EXAM = 'prova',
  WORK = 'trabalho',
  EXERCICE = 'exercício',
}

export enum examSubType {
  ACCUMULATIVE = 'accumulative',
  SUBSTITUTIVE = 'substitutive',
  GREATER = 'greater',
  MEAN = 'mean',
}

export interface IExam {
  id: string;

  type: examType;

  sub_type: examSubType;

  reference_id?: string;

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
