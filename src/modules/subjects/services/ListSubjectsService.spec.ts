import 'reflect-metadata';

import { ICreateSubjectDTO } from '../dtos/ICreateSubjectDTO';
import FakeSubjectsRepository from '../repositories/fakes/FakeSubjectsRepository';
import { ListSubjectsService } from './ListSubjectsService';

let fakeSubjectsRepository: FakeSubjectsRepository;

let listSubjectsService: ListSubjectsService;

let subjectData: ICreateSubjectDTO;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeSubjectsRepository = new FakeSubjectsRepository();

    listSubjectsService = new ListSubjectsService(fakeSubjectsRepository);

    subjectData = {
      name: 'subject1',
    };
  });

  it('Should be able to list subjects', async () => {
    const subject1 = await fakeSubjectsRepository.create(subjectData);

    const subject2 = await fakeSubjectsRepository.create({
      ...subjectData,
      name: 'subject2',
    });

    const subjects = await listSubjectsService.execute();

    expect(subjects).toEqual([subject1, subject2]);
  });
});
