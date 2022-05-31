import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IExam } from '../models/IExam';
import FakeExamsRepository from '../repositories/fakes/FakeExamsRepository';
import { DeleteExamService } from './DeleteExamService';

let fakeExamsRepository: FakeExamsRepository;
let deleteExamService: DeleteExamService;
let exam: IExam;

describe('DeleteExam', () => {
  const newExamData = {
    name: 'exam1',
  };

  beforeEach(async () => {
    fakeExamsRepository = new FakeExamsRepository();

    deleteExamService = new DeleteExamService(fakeExamsRepository);

    exam = await fakeExamsRepository.create(newExamData);
  });

  it('should be able to delete a exam', async () => {
    const deleteExamResult = await deleteExamService.execute(exam.id);

    const exams = await fakeExamsRepository.getAll();

    expect(exams).toHaveLength(0);

    expect(deleteExamResult).toBeUndefined();
  });

  it('should not be able to delete a exam if it does not exist', async () => {
    await expect(
      deleteExamService.execute('user non-existing'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
