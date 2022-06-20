import { IFilterQuery } from 'typeorm-dynamic-filters';

import { ICreateTeacherClassDTO } from '../dtos/ICreateTeacherClassDTO';
import { ITeacherClass } from '../models/ITeacherClass';

interface ITeacherClassesRepository {
  create(data: ICreateTeacherClassDTO): Promise<ITeacherClass>;
  createMany(data: ICreateTeacherClassDTO[]): Promise<ITeacherClass[]>;
  findByIds(data: ICreateTeacherClassDTO): Promise<ITeacherClass | undefined>;
  getAll(query: IFilterQuery): Promise<[ITeacherClass[], number]>;
  getAllByTeacher(teacher_id: string): Promise<ITeacherClass[]>;
  delete(user: ITeacherClass): Promise<void>;
}

export { ITeacherClassesRepository };
