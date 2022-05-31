import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateExamDTO } from '../dtos/ICreateExamDTO';
import FakeExamsRepository from '../repositories/fakes/FakeExamsRepository';
import { CreateExamService } from './CreateExamService';

let fakeExamsRepository: FakeExamsRepository;

let createExamService: CreateExamService;

let examData: ICreateExamDTO;

describe('CreateExamService', () => {
  beforeEach(() => {
    fakeExamsRepository = new FakeExamsRepository();

    createExamService = new CreateExamService(fakeExamsRepository);

    examData = {
      name: 'User',
    };
  });

  it('Should be able to create a new exam', async () => {
    const exam = await createExamService.execute(examData);

    expect(exam).toHaveProperty('id');
    expect(exam).toHaveProperty('name');

    expect(exam?.name).toBe(examData.name);
  });

  it('Should not create 2 exams with same name ', async () => {
    await createExamService.execute(examData);

    await expect(createExamService.execute(examData)).rejects.toBeInstanceOf(
      ErrorsApp,
    );
  });
});
