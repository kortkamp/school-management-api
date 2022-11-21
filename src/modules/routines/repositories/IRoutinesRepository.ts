import { ICreateRoutineDTO } from '../dtos/ICreateRoutineDTO';
import { IRoutine } from '../models/IRoutine';

interface IRoutinesRepository {
  create(data: ICreateRoutineDTO): Promise<IRoutine>;
  getAll(school_id: string): Promise<IRoutine[]>;
  getAllByClassGroup(
    school_id: string,
    routines_group_id: string,
    class_group_id: string,
  ): Promise<IRoutine[]>;
  getAllByTeacher(teacher_id: string): Promise<IRoutine[]>;
  findById(userId: string, relations?: string[]): Promise<IRoutine | undefined>;
  save(dataUpdate: IRoutine): Promise<void>;
  delete(user: IRoutine): Promise<void>;
  getTotal(): Promise<number>;
}

export { IRoutinesRepository };
