import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IFilteredModulesRepository } from '../repositories/IFilteredModulesRepository';

@injectable()
class ShowFilteredModuleService {
  constructor(
    @inject('FilteredModulesRepository')
    private filteredModulesRepository: IFilteredModulesRepository,
  ) {}
  public async execute(filteredModuleId: string) {
    const filteredModule = await this.filteredModulesRepository.findById(filteredModuleId);
    if (!filteredModule) {
      throw new ErrorsApp('FilteredModule does not exists', 404);
    }

    return filteredModule;
  }
}

export { ShowFilteredModuleService };
