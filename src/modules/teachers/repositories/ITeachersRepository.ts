import { ICreateTeacherDTO } from '../dtos/ICreateTeacherDTO';
import { IListTeachersDTO } from '../dtos/IListTeachersDTO';
import { ITeacher } from '../models/ITeacher';

interface ITeachersRepository {
  create(data: ICreateTeacherDTO): Promise<ITeacher>;
  getAll(params: IListTeachersDTO): Promise<[ITeacher[], number]>;
  findByPerson(
    school_id: string,
    person_id: string,
  ): Promise<ITeacher | undefined>;
  findById(
    school_id: string,
    teacherId: string,
    relations?: string[],
  ): Promise<ITeacher | undefined>;
  save(dataUpdate: ITeacher): Promise<void>;
  delete(teacher: ITeacher): Promise<void>;
}

export { ITeachersRepository };
