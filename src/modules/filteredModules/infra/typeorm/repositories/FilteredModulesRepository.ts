import { ICreateFilteredModuleDTO } from '@modules/filteredModules/dtos/ICreateFilteredModuleDTO';
import { IFilteredModulesRepository } from '@modules/filteredModules/repositories/IFilteredModulesRepository';
import { Repository } from 'typeorm';
import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';

import { AppDataSource } from '@shared/infra/typeorm';

import { FilteredModule } from '../models/FilteredModule';

class FilteredModulesRepository implements IFilteredModulesRepository {
  private ormRepository: Repository<FilteredModule>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<FilteredModule>(FilteredModule);
  }

  public async getTotal(): Promise<number> {
    const total = await this.ormRepository.count();

    return total;
  }

  public async create(data: ICreateFilteredModuleDTO): Promise<FilteredModule> {
    const newFilteredModule = this.ormRepository.create(data);

    await this.ormRepository.save(newFilteredModule);

    return newFilteredModule;
  }

  public async getAll(query: IFilterQuery): Promise<[FilteredModule[], number]> {
    const filterQueryBuilder = new FilterBuilder(this.ormRepository, 'user');

    const queryBuilder = filterQueryBuilder.build(query);

    const result = await queryBuilder.getManyAndCount();

    return result;
  }

  public async save(data: FilteredModule): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<FilteredModule | undefined> {
    const filteredModule = await this.ormRepository.findOne({
      where: { id },
      relations,
    });

    return filteredModule;
  }

  public async delete(filteredModule: FilteredModule): Promise<void> {
    await this.ormRepository.remove(filteredModule);
  }
}

export { FilteredModulesRepository };
