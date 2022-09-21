import { IGrade } from '@modules/grades/models/IGrade';

interface ICourse {
  id: string;

  school_id: string;

  name: string;

  segment_id: string;

  total_hours: number;

  phase_name: string;

  phases_number: number;

  grades: IGrade[];

  created_at: Date;

  updated_at: Date;
}

export { ICourse };
