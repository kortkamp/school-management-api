import 'reflect-metadata';

import { ICreateSchoolDTO } from '../dtos/ICreateSchoolDTO';
import FakeSchoolsRepository from '../repositories/fakes/FakeSchoolsRepository';
import { CreateSchoolService } from './CreateSchoolService';

let fakeSchoolsRepository: FakeSchoolsRepository;

let createSchoolService: CreateSchoolService;

let schoolData: ICreateSchoolDTO;

describe('CreateSchoolService', () => {
  beforeEach(() => {
    fakeSchoolsRepository = new FakeSchoolsRepository();

    createSchoolService = new CreateSchoolService(fakeSchoolsRepository);

    schoolData = {
      name: 'User',
    };
  });

  it('Should be able to create a new School', async () => {
    const school = await createSchoolService.execute(schoolData);

    expect(school).toHaveProperty('id');
    expect(school).toHaveProperty('name');

    expect(school?.name).toBe(schoolData.name);
  });
});
