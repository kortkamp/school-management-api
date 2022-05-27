import 'reflect-metadata';

import { ICreateSchoolDTO } from '../dtos/ICreateSchoolDTO';
import FakeSchoolsRepository from '../repositories/fakes/FakeSchoolsRepository';
import { ListSchoolsService } from './ListSchoolsService';

let fakeSchoolsRepository: FakeSchoolsRepository;

let listSchoolsService: ListSchoolsService;

let schoolData: ICreateSchoolDTO;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeSchoolsRepository = new FakeSchoolsRepository();

    listSchoolsService = new ListSchoolsService(fakeSchoolsRepository);

    schoolData = {
      name: 'School1',
    };
  });

  it('Should be able to list Schools', async () => {
    const School1 = await fakeSchoolsRepository.create(schoolData);

    const School2 = await fakeSchoolsRepository.create({
      ...schoolData,
      name: 'School2',
    });

    const Schools = await listSchoolsService.execute();

    expect(Schools).toEqual([School1, School2]);
  });
});
