import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IClassGroup } from '../models/IClassGroup';
import FakeClassGroupsRepository from '../repositories/fakes/FakeClassGroupsRepository';
import { DeleteClassGroupService } from './DeleteClassGroupService';

let fakeClassGroupsRepository: FakeClassGroupsRepository;
let deleteClassGroupService: DeleteClassGroupService;
let classGroup: IClassGroup;

describe('DeleteClassGroup', () => {
  const newClassGroupData = {
    name: 'classGroup1',
  };

  beforeEach(async () => {
    fakeClassGroupsRepository = new FakeClassGroupsRepository();

    deleteClassGroupService = new DeleteClassGroupService(fakeClassGroupsRepository);

    classGroup = await fakeClassGroupsRepository.create(newClassGroupData);
  });

  it('should be able to delete a classGroup', async () => {
    const deleteClassGroupResult = await deleteClassGroupService.execute(classGroup.id);

    const classGroups = await fakeClassGroupsRepository.getAll();

    expect(classGroups).toHaveLength(0);

    expect(deleteClassGroupResult).toBeUndefined();
  });

  it('should not be able to delete a classGroup if it does not exist', async () => {
    await expect(
      deleteClassGroupService.execute('user non-existing'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
