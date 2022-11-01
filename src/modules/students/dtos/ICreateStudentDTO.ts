interface ICreateStudentDTO {
  person_id: string;
  school_id: string;
  enroll_id?: string;
  enroll_date: string;

  course_id?: string;
  grade_id?: string;
  class_group_id?: string;

  active: boolean;
}

export { ICreateStudentDTO };
