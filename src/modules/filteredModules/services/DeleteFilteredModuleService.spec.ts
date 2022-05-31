import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IFilteredModule } from '../models/IFilteredModule';
import FakeFilteredModulesRepository from '../repositories/fakes/FakeFilteredModulesRepository';
import { DeleteFilteredModuleService } from './DeleteFilteredModuleService';

let fakeFilteredModulesRepository: FakeFilteredModulesRepository;
let deleteFilteredModuleService: DeleteFilteredModuleService;
let filteredModule: IFilteredModule;

describe('DeleteFilteredModule', () => {
  const newFilteredModuleData = {
    name: 'filteredModule1',
  };

  beforeEach(async () => {
    fakeFilteredModulesRepository = new FakeFilteredModulesRepository();

    deleteFilteredModuleService = new DeleteFilteredModuleService(fakeFilteredModulesRepository);

    filteredModule = await fakeFilteredModulesRepository.create(newFilteredModuleData);
  });

  it('should be able to delete a filteredModule', async () => {
    const deleteFilteredModuleResult = await deleteFilteredModuleService.execute(filteredModule.id);

    const filteredModules = await fakeFilteredModulesRepository.getAll();

    expect(filteredModules).toHaveLength(0);

    expect(deleteFilteredModuleResult).toBeUndefined();
  });

  it('should not be able to delete a filteredModule if it does not exist', async () => {
    await expect(
      deleteFilteredModuleService.execute('user non-existing'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
