interface IGrade {
  id: string;

  name: string;

  course_id: string;

  total_hours: number;

  days: number;

  created_at: Date;

  updated_at: Date;
}

export { IGrade };
