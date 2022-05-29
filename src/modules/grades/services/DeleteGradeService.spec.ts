import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IGrade } from '../models/IGrade';
import FakeGradesRepository from '../repositories/fakes/FakeGradesRepository';
import { DeleteGradeService } from './DeleteGradeService';

let fakeGradesRepository: FakeGradesRepository;
let deleteGradeService: DeleteGradeService;
let grade: IGrade;

describe('DeleteGrade', () => {
  const newGradeData = {
    name: 'grade1',
  };

  beforeEach(async () => {
    fakeGradesRepository = new FakeGradesRepository();

    deleteGradeService = new DeleteGradeService(fakeGradesRepository);

    grade = await fakeGradesRepository.create(newGradeData);
  });

  it('should be able to delete a grade', async () => {
    const deleteGradeResult = await deleteGradeService.execute(grade.id);

    const grades = await fakeGradesRepository.getAll();

    expect(grades).toHaveLength(0);

    expect(deleteGradeResult).toBeUndefined();
  });

  it('should not be able to delete a grade if it does not exist', async () => {
    await expect(
      deleteGradeService.execute('user non-existing'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
