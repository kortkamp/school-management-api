interface IExamResult {
  student_id: string;

  exam_id: string;

  // value refers to the percentage from the exam value
  value: number;

  created_at: Date;

  updated_at: Date;
}

export { IExamResult };
