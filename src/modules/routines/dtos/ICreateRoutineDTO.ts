import { RoutineType } from '../models/IRoutine';

interface ICreateRoutineDTO {
  routine_group_id: string;

  type: RoutineType;

  start_at: string;

  duration: string;

  date: Date;
}

export { ICreateRoutineDTO };
