import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IFilteredModulesRepository } from '../repositories/IFilteredModulesRepository';

@injectable()
class DeleteFilteredModuleService {
  constructor(
    @inject('FilteredModulesRepository')
    private filteredModulesRepository: IFilteredModulesRepository,
  ) {}
  public async execute(filteredModuleId: string) {
    const filteredModule = await this.filteredModulesRepository.findById(filteredModuleId);
    if (!filteredModule) {
      throw new ErrorsApp('FilteredModule does not exists', 404);
    }

    await this.filteredModulesRepository.delete(filteredModule);
  }
}

export { DeleteFilteredModuleService };
