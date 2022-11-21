import { ICreateClassGroupDTO } from '../dtos/ICreateClassGroupDTO';
import { IClassGroup } from '../models/IClassGroup';

interface IClassGroupsRepository {
  create(data: ICreateClassGroupDTO): Promise<IClassGroup>;
  getAll(school_id: string, relations?: string[]): Promise<IClassGroup[]>;
  listClassGroups(school_id: string): Promise<IClassGroup[]>;
  getAllByTeacher(teacher_id: string): Promise<IClassGroup[]>;
  findById(
    class_group_id: string,
    school_id: string,
  ): Promise<IClassGroup | undefined>;
  findByName(name: string): Promise<IClassGroup | undefined>;
  save(dataUpdate: IClassGroup): Promise<void>;
  delete(user: IClassGroup): Promise<void>;
  getTotal(): Promise<number>;
}

export { IClassGroupsRepository };
