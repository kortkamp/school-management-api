import { DayTime } from '@modules/routines/models/IRoutine';

interface IClassGroup {
  id: string;

  name: string;

  grade_id: string;

  day_time: DayTime;

  school_id: string;

  created_at: Date;

  updated_at: Date;
}

export { IClassGroup };
