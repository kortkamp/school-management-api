import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateGradeDTO } from '../dtos/ICreateGradeDTO';
import { IGrade } from '../models/IGrade';
import FakeGradesRepository from '../repositories/fakes/FakeGradesRepository';
import { UpdateGradeService } from './UpdateGradeService';

let fakeGradesRepository: FakeGradesRepository;

let updateGradeService: UpdateGradeService;

let gradeData: ICreateGradeDTO;

let grade: IGrade;

describe('UpdateGradeService', () => {
  beforeEach(async () => {
    fakeGradesRepository = new FakeGradesRepository();

    updateGradeService = new UpdateGradeService(fakeGradesRepository);

    gradeData = {
      name: 'User',
    };

    grade = await fakeGradesRepository.create(gradeData);
  });

  it('Should be able to update a grade', async () => {
    const updateGradeDate = { name: 'Admin' };

    const updatedGrade = await updateGradeService.execute({
      gradeId: grade.id,
      data: updateGradeDate,
    });

    const storedGrade = await fakeGradesRepository.findById(grade.id);

    expect(updatedGrade).toHaveProperty('id');
    expect(updatedGrade).toMatchObject(updateGradeDate);
    expect(updatedGrade?.id).toBe(grade.id);
    expect(storedGrade).toMatchObject(updateGradeDate);
  });

  it('Should not be able to update a nonexistent grade', async () => {
    const updateGradeDate = { name: 'Admin' };

    await expect(
      updateGradeService.execute({
        gradeId: 'nonexistent grade id',
        data: updateGradeDate,
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able to update a grade name to a already existent grade name', async () => {
    const anotherGradeData = {
      name: 'guest-user',
    };

    const anotherGrade = await fakeGradesRepository.create(anotherGradeData);

    await expect(
      updateGradeService.execute({
        gradeId: anotherGrade.id,
        data: { name: gradeData.name },
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
