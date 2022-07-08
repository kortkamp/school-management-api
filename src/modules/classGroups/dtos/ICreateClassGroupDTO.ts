import { DayTime } from '@modules/routines/models/IRoutine';

interface ICreateClassGroupDTO {
  name: string;
  grade_id: string;
  day_time: DayTime;
  school_id: string;
}

export { ICreateClassGroupDTO };
