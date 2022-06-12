import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTeacherDTO } from '../dtos/ICreateTeacherDTO';
import { ITeacher } from '../models/ITeacher';
import FakeTeachersRepository from '../repositories/fakes/FakeTeachersRepository';
import { UpdateTeacherService } from './UpdateTeacherService';

let fakeTeachersRepository: FakeTeachersRepository;

let updateTeacherService: UpdateTeacherService;

let teacherData: ICreateTeacherDTO;

let teacher: ITeacher;

describe('UpdateTeacherService', () => {
  beforeEach(async () => {
    fakeTeachersRepository = new FakeTeachersRepository();

    updateTeacherService = new UpdateTeacherService(fakeTeachersRepository);

    teacherData = {
      name: 'User',
    };

    teacher = await fakeTeachersRepository.create(teacherData);
  });

  it('Should be able to update a teacher', async () => {
    const updateTeacherDate = { name: 'Admin' };

    const updatedTeacher = await updateTeacherService.execute({
      teacherId: teacher.id,
      data: updateTeacherDate,
    });

    const storedTeacher = await fakeTeachersRepository.findById(teacher.id);

    expect(updatedTeacher).toHaveProperty('id');
    expect(updatedTeacher).toMatchObject(updateTeacherDate);
    expect(updatedTeacher?.id).toBe(teacher.id);
    expect(storedTeacher).toMatchObject(updateTeacherDate);
  });

  it('Should not be able to update a nonexistent teacher', async () => {
    const updateTeacherDate = { name: 'Admin' };

    await expect(
      updateTeacherService.execute({
        teacherId: 'nonexistent teacher id',
        data: updateTeacherDate,
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able to update a teacher name to a already existent teacher name', async () => {
    const anotherTeacherData = {
      name: 'guest-user',
    };

    const anotherTeacher = await fakeTeachersRepository.create(anotherTeacherData);

    await expect(
      updateTeacherService.execute({
        teacherId: anotherTeacher.id,
        data: { name: teacherData.name },
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
