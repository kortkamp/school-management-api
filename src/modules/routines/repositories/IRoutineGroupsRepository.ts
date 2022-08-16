import { ICreateRoutineGroupDTO } from '../dtos/ICreateRoutineGroupDTO';
import { IRoutineGroup } from '../models/IRoutineGroup';

interface IRoutineGroupsRepository {
  create(data: ICreateRoutineGroupDTO): Promise<IRoutineGroup>;
  getAll(school_id: string): Promise<IRoutineGroup[]>;
  findById(routineGroupId: string): Promise<IRoutineGroup | undefined>;
  save(routineGroup: IRoutineGroup): Promise<void>;
  delete(routineGroup: IRoutineGroup): Promise<void>;
}

export { IRoutineGroupsRepository };
