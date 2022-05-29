import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSubjectDTO } from '../dtos/ICreateSubjectDTO';
import FakeSubjectsRepository from '../repositories/fakes/FakeSubjectsRepository';
import { CreateSubjectService } from './CreateSubjectService';

let fakeSubjectsRepository: FakeSubjectsRepository;

let createSubjectService: CreateSubjectService;

let subjectData: ICreateSubjectDTO;

describe('CreateSubjectService', () => {
  beforeEach(() => {
    fakeSubjectsRepository = new FakeSubjectsRepository();

    createSubjectService = new CreateSubjectService(fakeSubjectsRepository);

    subjectData = {
      name: 'User',
    };
  });

  it('Should be able to create a new subject', async () => {
    const subject = await createSubjectService.execute(subjectData);

    expect(subject).toHaveProperty('id');
    expect(subject).toHaveProperty('name');

    expect(subject?.name).toBe(subjectData.name);
  });

  it('Should not create 2 subjects with same name ', async () => {
    await createSubjectService.execute(subjectData);

    await expect(createSubjectService.execute(subjectData)).rejects.toBeInstanceOf(
      ErrorsApp,
    );
  });
});
