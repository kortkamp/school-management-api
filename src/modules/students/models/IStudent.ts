interface IStudent {
  id: string;

  person_id: string;

  school_id: string;

  enroll_id?: string;

  enroll_date: string;

  course_id?: string;

  grade_id?: string;

  class_group_id?: string;

  active: boolean;

  tenant_id: string;

  created_at: Date;

  updated_at: Date;
}

export { IStudent };
