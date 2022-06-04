import { ICreateTeacherClassDTO } from '../dtos/ICreateTeacherClassDTO';
import { ITeacherClass } from '../models/ITeacherClass';

interface ITeacherClassesRepository {
  create(data: ICreateTeacherClassDTO): Promise<ITeacherClass>;
  findByIds(data: ICreateTeacherClassDTO): Promise<ITeacherClass | undefined>;
  delete(user: ITeacherClass): Promise<void>;
}

export { ITeacherClassesRepository };
