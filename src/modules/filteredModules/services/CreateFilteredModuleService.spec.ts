import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateFilteredModuleDTO } from '../dtos/ICreateFilteredModuleDTO';
import FakeFilteredModulesRepository from '../repositories/fakes/FakeFilteredModulesRepository';
import { CreateFilteredModuleService } from './CreateFilteredModuleService';

let fakeFilteredModulesRepository: FakeFilteredModulesRepository;

let createFilteredModuleService: CreateFilteredModuleService;

let filteredModuleData: ICreateFilteredModuleDTO;

describe('CreateFilteredModuleService', () => {
  beforeEach(() => {
    fakeFilteredModulesRepository = new FakeFilteredModulesRepository();

    createFilteredModuleService = new CreateFilteredModuleService(fakeFilteredModulesRepository);

    filteredModuleData = {
      name: 'User',
    };
  });

  it('Should be able to create a new filteredModule', async () => {
    const filteredModule = await createFilteredModuleService.execute(filteredModuleData);

    expect(filteredModule).toHaveProperty('id');
    expect(filteredModule).toHaveProperty('name');

    expect(filteredModule?.name).toBe(filteredModuleData.name);
  });

  it('Should not create 2 filteredModules with same name ', async () => {
    await createFilteredModuleService.execute(filteredModuleData);

    await expect(createFilteredModuleService.execute(filteredModuleData)).rejects.toBeInstanceOf(
      ErrorsApp,
    );
  });
});
