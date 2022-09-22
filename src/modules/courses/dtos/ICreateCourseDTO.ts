interface ICreateCourseDTO {
  id: string;

  school_id: string;

  name: string;

  segment_id: string;

  total_hours: number;

  phase_name: string;

  phases_number: number;

  grades: {
    name: string;
    total_hours: number;
    days: number;
    class_groups: { name: string }[];
  }[];
}

export { ICreateCourseDTO };
