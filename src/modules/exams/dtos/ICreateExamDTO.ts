interface ICreateExamDTO {
  type: string;

  value: number;

  weight: number;

  term_id: string;

  teacher_id: string;

  subject_id: string;

  class_id: string;

  date: Date;
}

export { ICreateExamDTO };
