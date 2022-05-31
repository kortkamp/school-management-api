import { inject, injectable } from 'tsyringe';
import { IFilterQuery } from 'typeorm-dynamic-filters';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';

import { IFilteredModulesRepository } from '../repositories/IFilteredModulesRepository';

@injectable()
class ListFilteredModulesService {
  constructor(
    @inject('FilteredModulesRepository')
    private filteredModulesRepository: IFilteredModulesRepository,
  ) {}
  public async execute(query: IFilterQuery): Promise<IListResultInterface> {
    const { page, per_page } = query;
    const [filteredModules, length] = await this.filteredModulesRepository.getAll(query);

    const total = await this.filteredModulesRepository.getTotal();

    return {
      result: filteredModules,
      total_registers: total,
      total_filtered: length,
      page,
      per_page,
      total_pages: Math.ceil(length / per_page),
    };
  }
}

export { ListFilteredModulesService };
