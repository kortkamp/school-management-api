import 'reflect-metadata';

import { ICreateClassGroupDTO } from '../dtos/ICreateClassGroupDTO';
import FakeClassGroupsRepository from '../repositories/fakes/FakeClassGroupsRepository';
import { ListClassGroupsService } from './ListClassGroupsService';

let fakeClassGroupsRepository: FakeClassGroupsRepository;

let listClassGroupsService: ListClassGroupsService;

let classGroupData: ICreateClassGroupDTO;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeClassGroupsRepository = new FakeClassGroupsRepository();

    listClassGroupsService = new ListClassGroupsService(fakeClassGroupsRepository);

    classGroupData = {
      name: 'classGroup1',
    };
  });

  it('Should be able to list classGroups', async () => {
    const classGroup1 = await fakeClassGroupsRepository.create(classGroupData);

    const classGroup2 = await fakeClassGroupsRepository.create({
      ...classGroupData,
      name: 'classGroup2',
    });

    const classGroups = await listClassGroupsService.execute();

    expect(classGroups).toEqual([classGroup1, classGroup2]);
  });
});
