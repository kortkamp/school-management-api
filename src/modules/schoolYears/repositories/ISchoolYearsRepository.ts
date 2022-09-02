import { ICreateSchoolYearDTO } from '../dtos/ICreateSchoolYearDTO';
import { ISchoolYear } from '../models/ISchoolYear';

interface ISchoolYearsRepository {
  create(data: ICreateSchoolYearDTO): Promise<ISchoolYear>;
  getAll(school_id: string): Promise<ISchoolYear[]>;
  findById(
    id: string,
    school_id: string,
    relations?: string[],
  ): Promise<ISchoolYear | undefined>;

  findByName(name: string, school_id: string): Promise<ISchoolYear | undefined>;

  save(dataUpdate: ISchoolYear): Promise<void>;
  delete(user: ISchoolYear): Promise<void>;
}

export { ISchoolYearsRepository };
