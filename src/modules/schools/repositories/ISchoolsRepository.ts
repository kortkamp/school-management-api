import { ICreateSchoolDTO } from '../dtos/ICreateSchoolDTO';
import { ISchool } from '../models/ISchool';

interface ISchoolsRepository {
  create(data: ICreateSchoolDTO): Promise<ISchool>;
  getAll(relations?: string[]): Promise<ISchool[]>;
  findById(userId: string, relations?: string[]): Promise<ISchool | undefined>;
  findByName(name: string): Promise<ISchool | undefined>;
  save(dataUpdate: ISchool): Promise<void>;
  delete(user: ISchool): Promise<void>;
  getTotal(): Promise<number>;
}

export { ISchoolsRepository };
