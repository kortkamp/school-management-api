import 'reflect-metadata';

import { ICreateSchoolYearDTO } from '../dtos/ICreateSchoolYearDTO';
import FakeSchoolYearsRepository from '../repositories/fakes/FakeSchoolYearsRepository';
import { ListSchoolYearsService } from './ListSchoolYearsService';

let fakeSchoolYearsRepository: FakeSchoolYearsRepository;

let listSchoolYearsService: ListSchoolYearsService;

let schoolYearData: ICreateSchoolYearDTO;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeSchoolYearsRepository = new FakeSchoolYearsRepository();

    listSchoolYearsService = new ListSchoolYearsService(fakeSchoolYearsRepository);

    schoolYearData = {
      name: 'schoolYear1',
    };
  });

  it('Should be able to list schoolYears', async () => {
    const schoolYear1 = await fakeSchoolYearsRepository.create(schoolYearData);

    const schoolYear2 = await fakeSchoolYearsRepository.create({
      ...schoolYearData,
      name: 'schoolYear2',
    });

    const schoolYears = await listSchoolYearsService.execute();

    expect(schoolYears).toEqual([schoolYear1, schoolYear2]);
  });
});
