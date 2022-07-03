import { examSubType, examType } from '../models/IExam';

interface ICreateExamDTO {
  type: examType;

  sub_type: examSubType;

  reference_id?: string;

  value: number;

  weight: number;

  term_id: string;

  teacher_id: string;

  subject_id: string;

  class_id: string;

  date: Date;
}

export { ICreateExamDTO };
