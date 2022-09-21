import { ICreateCourseDTO } from '../dtos/ICreateCourseDTO';
import { ICourse } from '../models/ICourse';

interface ICoursesRepository {
  create(data: ICreateCourseDTO): Promise<ICourse>;
  getAll(school_id: string, relations?: string[]): Promise<ICourse[]>;
  findById(
    id: string,
    school_id: string,
    relations?: string[],
  ): Promise<ICourse | undefined>;
  findByName(name: string, school_id: string): Promise<ICourse | undefined>;
  save(dataUpdate: ICourse): Promise<void>;
  delete(user: ICourse): Promise<void>;
}

export { ICoursesRepository };
