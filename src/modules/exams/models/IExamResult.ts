interface IExamResult {
  student_id: string;

  exam_id: string;

  value: number;

  created_at: Date;

  updated_at: Date;
}

export { IExamResult };
