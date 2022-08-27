import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ISchoolYear } from '../models/ISchoolYear';
import FakeSchoolYearsRepository from '../repositories/fakes/FakeSchoolYearsRepository';
import { DeleteSchoolYearService } from './DeleteSchoolYearService';

let fakeSchoolYearsRepository: FakeSchoolYearsRepository;
let deleteSchoolYearService: DeleteSchoolYearService;
let schoolYear: ISchoolYear;

describe('DeleteSchoolYear', () => {
  const newSchoolYearData = {
    name: 'schoolYear1',
  };

  beforeEach(async () => {
    fakeSchoolYearsRepository = new FakeSchoolYearsRepository();

    deleteSchoolYearService = new DeleteSchoolYearService(fakeSchoolYearsRepository);

    schoolYear = await fakeSchoolYearsRepository.create(newSchoolYearData);
  });

  it('should be able to delete a schoolYear', async () => {
    const deleteSchoolYearResult = await deleteSchoolYearService.execute(schoolYear.id);

    const schoolYears = await fakeSchoolYearsRepository.getAll();

    expect(schoolYears).toHaveLength(0);

    expect(deleteSchoolYearResult).toBeUndefined();
  });

  it('should not be able to delete a schoolYear if it does not exist', async () => {
    await expect(
      deleteSchoolYearService.execute('user non-existing'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
