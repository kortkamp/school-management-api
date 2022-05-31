import 'reflect-metadata';

import { ICreateFilteredModuleDTO } from '../dtos/ICreateFilteredModuleDTO';
import FakeFilteredModulesRepository from '../repositories/fakes/FakeFilteredModulesRepository';
import { ListFilteredModulesService } from './ListFilteredModulesService';

let fakeFilteredModulesRepository: FakeFilteredModulesRepository;

let listFilteredModulesService: ListFilteredModulesService;

let filteredModuleData: ICreateFilteredModuleDTO;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeFilteredModulesRepository = new FakeFilteredModulesRepository();

    listFilteredModulesService = new ListFilteredModulesService(fakeFilteredModulesRepository);

    filteredModuleData = {
      name: 'filteredModule1',
    };
  });

  it('Should be able to list filteredModules', async () => {
    const filteredModule1 = await fakeFilteredModulesRepository.create(filteredModuleData);

    const filteredModule2 = await fakeFilteredModulesRepository.create({
      ...filteredModuleData,
      name: 'filteredModule2',
    });

    const filteredModules = await listFilteredModulesService.execute();

    expect(filteredModules).toEqual([filteredModule1, filteredModule2]);
  });
});
