import { ICreateRoutineSubjectDTO } from '../dtos/ICreateRoutineSubjectDTO';
import { IRoutineSubject } from '../models/IRoutineSubject';

interface IRoutineSubjectsRepository {
  create(data: ICreateRoutineSubjectDTO[]): Promise<IRoutineSubject[]>;
  getAllByClassGroup(
    class_group_id: string,
    school_id: string,
  ): Promise<IRoutineSubject[]>;
  getAllByTeacher(teacher_id: string): Promise<IRoutineSubject[]>;
  save(dataUpdate: IRoutineSubject): Promise<void>;
  delete(user: IRoutineSubject): Promise<void>;
}

export { IRoutineSubjectsRepository };
