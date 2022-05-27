import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSchoolDTO } from '../dtos/ICreateSchoolDTO';
import { ISchool } from '../models/ISchool';
import FakeSchoolsRepository from '../repositories/fakes/FakeSchoolsRepository';
import { UpdateSchoolService } from './UpdateSchoolService';

let fakeSchoolsRepository: FakeSchoolsRepository;

let updateSchoolService: UpdateSchoolService;

let schoolData: ICreateSchoolDTO;

let school: ISchool;

describe('UpdateSchoolService', () => {
  beforeEach(async () => {
    fakeSchoolsRepository = new FakeSchoolsRepository();

    updateSchoolService = new UpdateSchoolService(fakeSchoolsRepository);

    schoolData = {
      name: 'User',
    };

    school = await fakeSchoolsRepository.create(schoolData);
  });

  it('Should be able to update a School', async () => {
    const updateSchoolDate = { name: 'School 123' };

    const updatedSchool = await updateSchoolService.execute({
      schoolId: school.id,
      data: updateSchoolDate,
    });

    const storedSchool = await fakeSchoolsRepository.findById(school.id);

    expect(updatedSchool).toHaveProperty('id');
    expect(updatedSchool).toMatchObject(updateSchoolDate);
    expect(updatedSchool?.id).toBe(school.id);
    expect(storedSchool).toMatchObject(updateSchoolDate);
  });

  it('Should not be able to update a nonexistent School', async () => {
    const updateSchoolDate = { name: 'School 123' };

    await expect(
      updateSchoolService.execute({
        schoolId: 'nonexistent School id',
        data: updateSchoolDate,
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
