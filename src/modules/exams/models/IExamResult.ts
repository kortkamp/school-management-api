interface IExamResult {
  id: string;

  value: number;

  student_id: string;

  exam_id: string;

  created_at: Date;

  updated_at: Date;
}

export { IExamResult };
