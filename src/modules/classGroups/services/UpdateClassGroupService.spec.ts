import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateClassGroupDTO } from '../dtos/ICreateClassGroupDTO';
import { IClassGroup } from '../models/IClassGroup';
import FakeClassGroupsRepository from '../repositories/fakes/FakeClassGroupsRepository';
import { UpdateClassGroupService } from './UpdateClassGroupService';

let fakeClassGroupsRepository: FakeClassGroupsRepository;

let updateClassGroupService: UpdateClassGroupService;

let classGroupData: ICreateClassGroupDTO;

let classGroup: IClassGroup;

describe('UpdateClassGroupService', () => {
  beforeEach(async () => {
    fakeClassGroupsRepository = new FakeClassGroupsRepository();

    updateClassGroupService = new UpdateClassGroupService(fakeClassGroupsRepository);

    classGroupData = {
      name: 'User',
    };

    classGroup = await fakeClassGroupsRepository.create(classGroupData);
  });

  it('Should be able to update a classGroup', async () => {
    const updateClassGroupDate = { name: 'Admin' };

    const updatedClassGroup = await updateClassGroupService.execute({
      classGroupId: classGroup.id,
      data: updateClassGroupDate,
    });

    const storedClassGroup = await fakeClassGroupsRepository.findById(classGroup.id);

    expect(updatedClassGroup).toHaveProperty('id');
    expect(updatedClassGroup).toMatchObject(updateClassGroupDate);
    expect(updatedClassGroup?.id).toBe(classGroup.id);
    expect(storedClassGroup).toMatchObject(updateClassGroupDate);
  });

  it('Should not be able to update a nonexistent classGroup', async () => {
    const updateClassGroupDate = { name: 'Admin' };

    await expect(
      updateClassGroupService.execute({
        classGroupId: 'nonexistent classGroup id',
        data: updateClassGroupDate,
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able to update a classGroup name to a already existent classGroup name', async () => {
    const anotherClassGroupData = {
      name: 'guest-user',
    };

    const anotherClassGroup = await fakeClassGroupsRepository.create(anotherClassGroupData);

    await expect(
      updateClassGroupService.execute({
        classGroupId: anotherClassGroup.id,
        data: { name: classGroupData.name },
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
