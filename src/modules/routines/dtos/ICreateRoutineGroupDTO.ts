import { ICreateRoutineDTO } from './ICreateRoutineDTO';

interface ICreateRoutineGroupDTO {
  name: string;
  school_id: string;
  routines?: Partial<ICreateRoutineDTO>[];
}

export { ICreateRoutineGroupDTO };
