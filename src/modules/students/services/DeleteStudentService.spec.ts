import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IStudent } from '../models/IStudent';
import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';
import { DeleteStudentService } from './DeleteStudentService';

let fakeStudentsRepository: FakeStudentsRepository;
let deleteStudentService: DeleteStudentService;
let student: IStudent;

describe('DeleteStudent', () => {
  const newStudentData = {
    name: 'student1',
  };

  beforeEach(async () => {
    fakeStudentsRepository = new FakeStudentsRepository();

    deleteStudentService = new DeleteStudentService(fakeStudentsRepository);

    student = await fakeStudentsRepository.create(newStudentData);
  });

  it('should be able to delete a student', async () => {
    const deleteStudentResult = await deleteStudentService.execute(student.id);

    const students = await fakeStudentsRepository.getAll();

    expect(students).toHaveLength(0);

    expect(deleteStudentResult).toBeUndefined();
  });

  it('should not be able to delete a student if it does not exist', async () => {
    await expect(
      deleteStudentService.execute('user non-existing'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
