import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTeacherDTO } from '../dtos/ICreateTeacherDTO';
import FakeTeachersRepository from '../repositories/fakes/FakeTeachersRepository';
import { CreateTeacherService } from './CreateTeacherService';

let fakeTeachersRepository: FakeTeachersRepository;

let createTeacherService: CreateTeacherService;

let teacherData: ICreateTeacherDTO;

describe('CreateTeacherService', () => {
  beforeEach(() => {
    fakeTeachersRepository = new FakeTeachersRepository();

    createTeacherService = new CreateTeacherService(fakeTeachersRepository);

    teacherData = {
      name: 'User',
    };
  });

  it('Should be able to create a new teacher', async () => {
    const teacher = await createTeacherService.execute(teacherData);

    expect(teacher).toHaveProperty('id');
    expect(teacher).toHaveProperty('name');

    expect(teacher?.name).toBe(teacherData.name);
  });

  it('Should not create 2 teachers with same name ', async () => {
    await createTeacherService.execute(teacherData);

    await expect(createTeacherService.execute(teacherData)).rejects.toBeInstanceOf(
      ErrorsApp,
    );
  });
});
