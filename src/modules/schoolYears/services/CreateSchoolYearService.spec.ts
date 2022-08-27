import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSchoolYearDTO } from '../dtos/ICreateSchoolYearDTO';
import FakeSchoolYearsRepository from '../repositories/fakes/FakeSchoolYearsRepository';
import { CreateSchoolYearService } from './CreateSchoolYearService';

let fakeSchoolYearsRepository: FakeSchoolYearsRepository;

let createSchoolYearService: CreateSchoolYearService;

let schoolYearData: ICreateSchoolYearDTO;

describe('CreateSchoolYearService', () => {
  beforeEach(() => {
    fakeSchoolYearsRepository = new FakeSchoolYearsRepository();

    createSchoolYearService = new CreateSchoolYearService(fakeSchoolYearsRepository);

    schoolYearData = {
      name: 'User',
    };
  });

  it('Should be able to create a new schoolYear', async () => {
    const schoolYear = await createSchoolYearService.execute(schoolYearData);

    expect(schoolYear).toHaveProperty('id');
    expect(schoolYear).toHaveProperty('name');

    expect(schoolYear?.name).toBe(schoolYearData.name);
  });

  it('Should not create 2 schoolYears with same name ', async () => {
    await createSchoolYearService.execute(schoolYearData);

    await expect(createSchoolYearService.execute(schoolYearData)).rejects.toBeInstanceOf(
      ErrorsApp,
    );
  });
});
