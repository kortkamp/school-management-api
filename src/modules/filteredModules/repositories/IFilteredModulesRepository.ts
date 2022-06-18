import { IFilterQuery } from 'typeorm-dynamic-filters';

import { ICreateFilteredModuleDTO } from '../dtos/ICreateFilteredModuleDTO';
import { IFilteredModule } from '../models/IFilteredModule';

interface IFilteredModulesRepository {
  create(data: ICreateFilteredModuleDTO): Promise<IFilteredModule>;
  getAll(query: IFilterQuery): Promise<[IFilteredModule[], number]>;
  findById(
    userId: string,
    relations?: string[],
  ): Promise<IFilteredModule | undefined>;
  save(dataUpdate: IFilteredModule): Promise<void>;
  delete(user: IFilteredModule): Promise<void>;
  getTotal(): Promise<number>;
}

export { IFilteredModulesRepository };
