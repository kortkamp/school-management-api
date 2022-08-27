import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSchoolYearDTO } from '../dtos/ICreateSchoolYearDTO';
import { ISchoolYear } from '../models/ISchoolYear';
import FakeSchoolYearsRepository from '../repositories/fakes/FakeSchoolYearsRepository';
import { UpdateSchoolYearService } from './UpdateSchoolYearService';

let fakeSchoolYearsRepository: FakeSchoolYearsRepository;

let updateSchoolYearService: UpdateSchoolYearService;

let schoolYearData: ICreateSchoolYearDTO;

let schoolYear: ISchoolYear;

describe('UpdateSchoolYearService', () => {
  beforeEach(async () => {
    fakeSchoolYearsRepository = new FakeSchoolYearsRepository();

    updateSchoolYearService = new UpdateSchoolYearService(fakeSchoolYearsRepository);

    schoolYearData = {
      name: 'User',
    };

    schoolYear = await fakeSchoolYearsRepository.create(schoolYearData);
  });

  it('Should be able to update a schoolYear', async () => {
    const updateSchoolYearDate = { name: 'Admin' };

    const updatedSchoolYear = await updateSchoolYearService.execute({
      schoolYearId: schoolYear.id,
      data: updateSchoolYearDate,
    });

    const storedSchoolYear = await fakeSchoolYearsRepository.findById(schoolYear.id);

    expect(updatedSchoolYear).toHaveProperty('id');
    expect(updatedSchoolYear).toMatchObject(updateSchoolYearDate);
    expect(updatedSchoolYear?.id).toBe(schoolYear.id);
    expect(storedSchoolYear).toMatchObject(updateSchoolYearDate);
  });

  it('Should not be able to update a nonexistent schoolYear', async () => {
    const updateSchoolYearDate = { name: 'Admin' };

    await expect(
      updateSchoolYearService.execute({
        schoolYearId: 'nonexistent schoolYear id',
        data: updateSchoolYearDate,
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able to update a schoolYear name to a already existent schoolYear name', async () => {
    const anotherSchoolYearData = {
      name: 'guest-user',
    };

    const anotherSchoolYear = await fakeSchoolYearsRepository.create(anotherSchoolYearData);

    await expect(
      updateSchoolYearService.execute({
        schoolYearId: anotherSchoolYear.id,
        data: { name: schoolYearData.name },
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
