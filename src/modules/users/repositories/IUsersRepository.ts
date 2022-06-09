import { IFilterQuery } from 'typeorm-dynamic-filters';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUser } from '../models/IUser';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<IUser>;
  getAll(query: IFilterQuery): Promise<[IUser[], number]>;
  findById(userId: string, relations?: string[]): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  save(dataUpdate: IUser): Promise<void>;
  delete(user: IUser): Promise<void>;
  getTotal(): Promise<number>;
}

export { IUsersRepository };
