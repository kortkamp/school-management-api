interface ICreateCourseDTO {
  id: string;

  school_id: string;

  name: string;

  segment_id: string;

  total_hours: number;

  phase_name: string;

  phases_number: number;
}

export { ICreateCourseDTO };
