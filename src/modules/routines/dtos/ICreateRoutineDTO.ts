import { DayTime } from '../models/IRoutine';

interface ICreateRoutineDTO {
  type: string;

  school_id: string;

  day_time: DayTime;

  start_at: string;

  end_at: string;

  date: Date;
}

export { ICreateRoutineDTO };
