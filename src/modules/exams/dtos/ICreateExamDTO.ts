import { examType } from '../models/IExam';

interface ICreateExamDTO {
  type: examType;

  value: number;

  weight: number;

  term_id: string;

  teacher_id: string;

  subject_id: string;

  class_group_id: string;

  date: Date;
}

export { ICreateExamDTO };
