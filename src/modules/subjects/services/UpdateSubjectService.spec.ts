import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSubjectDTO } from '../dtos/ICreateSubjectDTO';
import { ISubject } from '../models/ISubject';
import FakeSubjectsRepository from '../repositories/fakes/FakeSubjectsRepository';
import { UpdateSubjectService } from './UpdateSubjectService';

let fakeSubjectsRepository: FakeSubjectsRepository;

let updateSubjectService: UpdateSubjectService;

let subjectData: ICreateSubjectDTO;

let subject: ISubject;

describe('UpdateSubjectService', () => {
  beforeEach(async () => {
    fakeSubjectsRepository = new FakeSubjectsRepository();

    updateSubjectService = new UpdateSubjectService(fakeSubjectsRepository);

    subjectData = {
      name: 'User',
    };

    subject = await fakeSubjectsRepository.create(subjectData);
  });

  it('Should be able to update a subject', async () => {
    const updateSubjectDate = { name: 'Admin' };

    const updatedSubject = await updateSubjectService.execute({
      subjectId: subject.id,
      data: updateSubjectDate,
    });

    const storedSubject = await fakeSubjectsRepository.findById(subject.id);

    expect(updatedSubject).toHaveProperty('id');
    expect(updatedSubject).toMatchObject(updateSubjectDate);
    expect(updatedSubject?.id).toBe(subject.id);
    expect(storedSubject).toMatchObject(updateSubjectDate);
  });

  it('Should not be able to update a nonexistent subject', async () => {
    const updateSubjectDate = { name: 'Admin' };

    await expect(
      updateSubjectService.execute({
        subjectId: 'nonexistent subject id',
        data: updateSubjectDate,
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able to update a subject name to a already existent subject name', async () => {
    const anotherSubjectData = {
      name: 'guest-user',
    };

    const anotherSubject = await fakeSubjectsRepository.create(anotherSubjectData);

    await expect(
      updateSubjectService.execute({
        subjectId: anotherSubject.id,
        data: { name: subjectData.name },
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
