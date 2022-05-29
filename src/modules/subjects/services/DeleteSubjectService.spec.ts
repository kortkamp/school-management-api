import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ISubject } from '../models/ISubject';
import FakeSubjectsRepository from '../repositories/fakes/FakeSubjectsRepository';
import { DeleteSubjectService } from './DeleteSubjectService';

let fakeSubjectsRepository: FakeSubjectsRepository;
let deleteSubjectService: DeleteSubjectService;
let subject: ISubject;

describe('DeleteSubject', () => {
  const newSubjectData = {
    name: 'subject1',
  };

  beforeEach(async () => {
    fakeSubjectsRepository = new FakeSubjectsRepository();

    deleteSubjectService = new DeleteSubjectService(fakeSubjectsRepository);

    subject = await fakeSubjectsRepository.create(newSubjectData);
  });

  it('should be able to delete a subject', async () => {
    const deleteSubjectResult = await deleteSubjectService.execute(subject.id);

    const subjects = await fakeSubjectsRepository.getAll();

    expect(subjects).toHaveLength(0);

    expect(deleteSubjectResult).toBeUndefined();
  });

  it('should not be able to delete a subject if it does not exist', async () => {
    await expect(
      deleteSubjectService.execute('user non-existing'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
