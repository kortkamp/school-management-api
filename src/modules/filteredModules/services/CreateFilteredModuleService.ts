import { inject, injectable } from 'tsyringe';

import { ICreateFilteredModuleDTO } from '../dtos/ICreateFilteredModuleDTO';
import { IFilteredModulesRepository } from '../repositories/IFilteredModulesRepository';

@injectable()
class CreateFilteredModuleService {
  constructor(
    @inject('FilteredModulesRepository')
    private filteredModulesRepository: IFilteredModulesRepository,
  ) {}

  public async execute(data: ICreateFilteredModuleDTO) {
    const filteredModule = await this.filteredModulesRepository.create(data);

    return filteredModule;
  }
}

export { CreateFilteredModuleService };
