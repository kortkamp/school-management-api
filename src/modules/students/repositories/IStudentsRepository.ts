import { ICreateStudentDTO } from '../dtos/ICreateStudentDTO';
import { IListStudentsDTO } from '../dtos/IListStudentsDTO';
import { IStudent } from '../models/IStudent';

interface IStudentsRepository {
  create(data: ICreateStudentDTO): Promise<IStudent>;
  getAll(params: IListStudentsDTO): Promise<[IStudent[], number]>;
  findById(
    school_id: string,
    userId: string,
    relations?: string[],
  ): Promise<IStudent | undefined>;
  findByEnrollId(
    school_id: string,
    enroll_id: string,
  ): Promise<IStudent | undefined>;
  save(dataUpdate: IStudent): Promise<void>;
  delete(student: IStudent): Promise<void>;
}

export { IStudentsRepository };
