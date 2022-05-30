import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateClassGroupDTO } from '../dtos/ICreateClassGroupDTO';
import FakeClassGroupsRepository from '../repositories/fakes/FakeClassGroupsRepository';
import { CreateClassGroupService } from './CreateClassGroupService';

let fakeClassGroupsRepository: FakeClassGroupsRepository;

let createClassGroupService: CreateClassGroupService;

let classGroupData: ICreateClassGroupDTO;

describe('CreateClassGroupService', () => {
  beforeEach(() => {
    fakeClassGroupsRepository = new FakeClassGroupsRepository();

    createClassGroupService = new CreateClassGroupService(fakeClassGroupsRepository);

    classGroupData = {
      name: 'User',
    };
  });

  it('Should be able to create a new classGroup', async () => {
    const classGroup = await createClassGroupService.execute(classGroupData);

    expect(classGroup).toHaveProperty('id');
    expect(classGroup).toHaveProperty('name');

    expect(classGroup?.name).toBe(classGroupData.name);
  });

  it('Should not create 2 classGroups with same name ', async () => {
    await createClassGroupService.execute(classGroupData);

    await expect(createClassGroupService.execute(classGroupData)).rejects.toBeInstanceOf(
      ErrorsApp,
    );
  });
});
