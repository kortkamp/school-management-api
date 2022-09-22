import { ClassGroup } from '@modules/classGroups/infra/typeorm/models/ClassGroup';

interface IGrade {
  id: string;

  name: string;

  course_id: string;

  total_hours: number;

  days: number;

  class_groups: ClassGroup[];

  created_at: Date;

  updated_at: Date;
}

export { IGrade };
