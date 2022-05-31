import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateExamDTO } from '../dtos/ICreateExamDTO';
import { IExam } from '../models/IExam';
import FakeExamsRepository from '../repositories/fakes/FakeExamsRepository';
import { UpdateExamService } from './UpdateExamService';

let fakeExamsRepository: FakeExamsRepository;

let updateExamService: UpdateExamService;

let examData: ICreateExamDTO;

let exam: IExam;

describe('UpdateExamService', () => {
  beforeEach(async () => {
    fakeExamsRepository = new FakeExamsRepository();

    updateExamService = new UpdateExamService(fakeExamsRepository);

    examData = {
      name: 'User',
    };

    exam = await fakeExamsRepository.create(examData);
  });

  it('Should be able to update a exam', async () => {
    const updateExamDate = { name: 'Admin' };

    const updatedExam = await updateExamService.execute({
      examId: exam.id,
      data: updateExamDate,
    });

    const storedExam = await fakeExamsRepository.findById(exam.id);

    expect(updatedExam).toHaveProperty('id');
    expect(updatedExam).toMatchObject(updateExamDate);
    expect(updatedExam?.id).toBe(exam.id);
    expect(storedExam).toMatchObject(updateExamDate);
  });

  it('Should not be able to update a nonexistent exam', async () => {
    const updateExamDate = { name: 'Admin' };

    await expect(
      updateExamService.execute({
        examId: 'nonexistent exam id',
        data: updateExamDate,
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able to update a exam name to a already existent exam name', async () => {
    const anotherExamData = {
      name: 'guest-user',
    };

    const anotherExam = await fakeExamsRepository.create(anotherExamData);

    await expect(
      updateExamService.execute({
        examId: anotherExam.id,
        data: { name: examData.name },
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
