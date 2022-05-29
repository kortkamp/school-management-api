import 'reflect-metadata';

import { ICreateGradeDTO } from '../dtos/ICreateGradeDTO';
import FakeGradesRepository from '../repositories/fakes/FakeGradesRepository';
import { ListGradesService } from './ListGradesService';

let fakeGradesRepository: FakeGradesRepository;

let listGradesService: ListGradesService;

let gradeData: ICreateGradeDTO;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeGradesRepository = new FakeGradesRepository();

    listGradesService = new ListGradesService(fakeGradesRepository);

    gradeData = {
      name: 'grade1',
    };
  });

  it('Should be able to list grades', async () => {
    const grade1 = await fakeGradesRepository.create(gradeData);

    const grade2 = await fakeGradesRepository.create({
      ...gradeData,
      name: 'grade2',
    });

    const grades = await listGradesService.execute();

    expect(grades).toEqual([grade1, grade2]);
  });
});
