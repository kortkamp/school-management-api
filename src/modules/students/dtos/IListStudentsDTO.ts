interface IListStudentsDTO {
  school_id: string;
  course_id?: string;
  grade_id?: string;
  class_group_id?: string;
  active: boolean;
  page: number;
  per_page: number;
}

export { IListStudentsDTO };
