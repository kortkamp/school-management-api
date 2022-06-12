import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ITeacher } from '../models/ITeacher';
import FakeTeachersRepository from '../repositories/fakes/FakeTeachersRepository';
import { DeleteTeacherService } from './DeleteTeacherService';

let fakeTeachersRepository: FakeTeachersRepository;
let deleteTeacherService: DeleteTeacherService;
let teacher: ITeacher;

describe('DeleteTeacher', () => {
  const newTeacherData = {
    name: 'teacher1',
  };

  beforeEach(async () => {
    fakeTeachersRepository = new FakeTeachersRepository();

    deleteTeacherService = new DeleteTeacherService(fakeTeachersRepository);

    teacher = await fakeTeachersRepository.create(newTeacherData);
  });

  it('should be able to delete a teacher', async () => {
    const deleteTeacherResult = await deleteTeacherService.execute(teacher.id);

    const teachers = await fakeTeachersRepository.getAll();

    expect(teachers).toHaveLength(0);

    expect(deleteTeacherResult).toBeUndefined();
  });

  it('should not be able to delete a teacher if it does not exist', async () => {
    await expect(
      deleteTeacherService.execute('user non-existing'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
