import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateStudentDTO } from '../dtos/ICreateStudentDTO';
import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';
import { CreateStudentService } from './CreateStudentService';

let fakeStudentsRepository: FakeStudentsRepository;

let createStudentService: CreateStudentService;

let studentData: ICreateStudentDTO;

describe('CreateStudentService', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();

    createStudentService = new CreateStudentService(fakeStudentsRepository);

    studentData = {
      name: 'User',
    };
  });

  it('Should be able to create a new student', async () => {
    const student = await createStudentService.execute(studentData);

    expect(student).toHaveProperty('id');
    expect(student).toHaveProperty('name');

    expect(student?.name).toBe(studentData.name);
  });

  it('Should not create 2 students with same name ', async () => {
    await createStudentService.execute(studentData);

    await expect(createStudentService.execute(studentData)).rejects.toBeInstanceOf(
      ErrorsApp,
    );
  });
});
