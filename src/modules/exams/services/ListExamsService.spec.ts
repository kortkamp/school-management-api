import 'reflect-metadata';

import { ICreateExamDTO } from '../dtos/ICreateExamDTO';
import FakeExamsRepository from '../repositories/fakes/FakeExamsRepository';
import { ListExamsService } from './ListExamsService';

let fakeExamsRepository: FakeExamsRepository;

let listExamsService: ListExamsService;

let examData: ICreateExamDTO;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeExamsRepository = new FakeExamsRepository();

    listExamsService = new ListExamsService(fakeExamsRepository);

    examData = {
      name: 'exam1',
    };
  });

  it('Should be able to list exams', async () => {
    const exam1 = await fakeExamsRepository.create(examData);

    const exam2 = await fakeExamsRepository.create({
      ...examData,
      name: 'exam2',
    });

    const exams = await listExamsService.execute();

    expect(exams).toEqual([exam1, exam2]);
  });
});
