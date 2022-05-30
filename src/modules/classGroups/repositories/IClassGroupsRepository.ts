import { ICreateClassGroupDTO } from '../dtos/ICreateClassGroupDTO';
import { IClassGroup } from '../models/IClassGroup';

interface IClassGroupsRepository {
  create(data: ICreateClassGroupDTO): Promise<IClassGroup>;
  getAll(relations?: string[]): Promise<IClassGroup[]>;
  findById(userId: string, relations?: string[]): Promise<IClassGroup | undefined>;
  findByName(name: string): Promise<IClassGroup | undefined>;
  save(dataUpdate: IClassGroup): Promise<void>;
  delete(user: IClassGroup): Promise<void>;
  getTotal(): Promise<number>;
}

export { IClassGroupsRepository };
