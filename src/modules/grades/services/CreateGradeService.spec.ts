import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateGradeDTO } from '../dtos/ICreateGradeDTO';
import FakeGradesRepository from '../repositories/fakes/FakeGradesRepository';
import { CreateGradeService } from './CreateGradeService';

let fakeGradesRepository: FakeGradesRepository;

let createGradeService: CreateGradeService;

let gradeData: ICreateGradeDTO;

describe('CreateGradeService', () => {
  beforeEach(() => {
    fakeGradesRepository = new FakeGradesRepository();

    createGradeService = new CreateGradeService(fakeGradesRepository);

    gradeData = {
      name: 'User',
    };
  });

  it('Should be able to create a new grade', async () => {
    const grade = await createGradeService.execute(gradeData);

    expect(grade).toHaveProperty('id');
    expect(grade).toHaveProperty('name');

    expect(grade?.name).toBe(gradeData.name);
  });

  it('Should not create 2 grades with same name ', async () => {
    await createGradeService.execute(gradeData);

    await expect(createGradeService.execute(gradeData)).rejects.toBeInstanceOf(
      ErrorsApp,
    );
  });
});
