import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateFilteredModuleDTO } from '../dtos/ICreateFilteredModuleDTO';
import { IFilteredModule } from '../models/IFilteredModule';
import FakeFilteredModulesRepository from '../repositories/fakes/FakeFilteredModulesRepository';
import { UpdateFilteredModuleService } from './UpdateFilteredModuleService';

let fakeFilteredModulesRepository: FakeFilteredModulesRepository;

let updateFilteredModuleService: UpdateFilteredModuleService;

let filteredModuleData: ICreateFilteredModuleDTO;

let filteredModule: IFilteredModule;

describe('UpdateFilteredModuleService', () => {
  beforeEach(async () => {
    fakeFilteredModulesRepository = new FakeFilteredModulesRepository();

    updateFilteredModuleService = new UpdateFilteredModuleService(fakeFilteredModulesRepository);

    filteredModuleData = {
      name: 'User',
    };

    filteredModule = await fakeFilteredModulesRepository.create(filteredModuleData);
  });

  it('Should be able to update a filteredModule', async () => {
    const updateFilteredModuleDate = { name: 'Admin' };

    const updatedFilteredModule = await updateFilteredModuleService.execute({
      filteredModuleId: filteredModule.id,
      data: updateFilteredModuleDate,
    });

    const storedFilteredModule = await fakeFilteredModulesRepository.findById(filteredModule.id);

    expect(updatedFilteredModule).toHaveProperty('id');
    expect(updatedFilteredModule).toMatchObject(updateFilteredModuleDate);
    expect(updatedFilteredModule?.id).toBe(filteredModule.id);
    expect(storedFilteredModule).toMatchObject(updateFilteredModuleDate);
  });

  it('Should not be able to update a nonexistent filteredModule', async () => {
    const updateFilteredModuleDate = { name: 'Admin' };

    await expect(
      updateFilteredModuleService.execute({
        filteredModuleId: 'nonexistent filteredModule id',
        data: updateFilteredModuleDate,
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able to update a filteredModule name to a already existent filteredModule name', async () => {
    const anotherFilteredModuleData = {
      name: 'guest-user',
    };

    const anotherFilteredModule = await fakeFilteredModulesRepository.create(anotherFilteredModuleData);

    await expect(
      updateFilteredModuleService.execute({
        filteredModuleId: anotherFilteredModule.id,
        data: { name: filteredModuleData.name },
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
