import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateFilteredModuleDTO } from '../dtos/ICreateFilteredModuleDTO';
import { IFilteredModulesRepository } from '../repositories/IFilteredModulesRepository';

interface IRequest {
  filteredModuleId: string;
  data: Partial<ICreateFilteredModuleDTO>;
}

@injectable()
class UpdateFilteredModuleService {
  constructor(
    @inject('FilteredModulesRepository')
    private filteredModulesRepository: IFilteredModulesRepository,
  ) {}
  public async execute({ filteredModuleId, data }: IRequest) {
    const filteredModule = await this.filteredModulesRepository.findById(filteredModuleId);

    if (!filteredModule) {
      throw new ErrorsApp('FilteredModule not found', 404);
    }

    Object.assign(filteredModule, data);

    await this.filteredModulesRepository.save(filteredModule);

    return filteredModule;
  }
}

export { UpdateFilteredModuleService };
