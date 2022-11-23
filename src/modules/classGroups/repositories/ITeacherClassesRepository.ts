import { ICreateTeacherClassDTO } from '../dtos/ICreateTeacherClassDTO';
import { IListTeacherClassDTO } from '../dtos/IListTeacherClassDTO';
import { ITeacherClass } from '../models/ITeacherClass';

interface ITeacherClassesRepository {
  create(data: ICreateTeacherClassDTO): Promise<ITeacherClass>;
  createMany(data: ICreateTeacherClassDTO[]): Promise<ITeacherClass[]>;
  findByIds(data: ICreateTeacherClassDTO): Promise<ITeacherClass | undefined>;
  findMany(ids: string[]): Promise<ITeacherClass[]>;
  getAll(query: IListTeacherClassDTO): Promise<[ITeacherClass[], number]>;
  getAllByTeacher(teacher_id: string): Promise<ITeacherClass[]>;
  save(data: ITeacherClass[]): Promise<void>;
  delete(user: ITeacherClass): Promise<void>;
}

export { ITeacherClassesRepository };
