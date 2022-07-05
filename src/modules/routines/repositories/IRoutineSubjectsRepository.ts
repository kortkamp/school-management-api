import { ICreateRoutineSubjectDTO } from '../dtos/ICreateRoutineSubjectDTO';
import { IRoutineSubject } from '../models/IRoutineSubject';

interface IRoutineSubjectsRepository {
  create(data: ICreateRoutineSubjectDTO): Promise<IRoutineSubject>;
  getAllByClassGroup(class_group_id: string): Promise<IRoutineSubject[]>;
  getAllBySubject(subject_id: string): Promise<IRoutineSubject[]>;
  findById(routineSubjectId: string): Promise<IRoutineSubject | undefined>;
  save(dataUpdate: IRoutineSubject): Promise<void>;
  delete(user: IRoutineSubject): Promise<void>;
}

export { IRoutineSubjectsRepository };
