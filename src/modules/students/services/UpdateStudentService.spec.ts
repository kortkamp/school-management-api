import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateStudentDTO } from '../dtos/ICreateStudentDTO';
import { IStudent } from '../models/IStudent';
import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';
import { UpdateStudentService } from './UpdateStudentService';

let fakeStudentsRepository: FakeStudentsRepository;

let updateStudentService: UpdateStudentService;

let studentData: ICreateStudentDTO;

let student: IStudent;

describe('UpdateStudentService', () => {
  beforeEach(async () => {
    fakeStudentsRepository = new FakeStudentsRepository();

    updateStudentService = new UpdateStudentService(fakeStudentsRepository);

    studentData = {
      name: 'User',
    };

    student = await fakeStudentsRepository.create(studentData);
  });

  it('Should be able to update a student', async () => {
    const updateStudentDate = { name: 'Admin' };

    const updatedStudent = await updateStudentService.execute({
      studentId: student.id,
      data: updateStudentDate,
    });

    const storedStudent = await fakeStudentsRepository.findById(student.id);

    expect(updatedStudent).toHaveProperty('id');
    expect(updatedStudent).toMatchObject(updateStudentDate);
    expect(updatedStudent?.id).toBe(student.id);
    expect(storedStudent).toMatchObject(updateStudentDate);
  });

  it('Should not be able to update a nonexistent student', async () => {
    const updateStudentDate = { name: 'Admin' };

    await expect(
      updateStudentService.execute({
        studentId: 'nonexistent student id',
        data: updateStudentDate,
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able to update a student name to a already existent student name', async () => {
    const anotherStudentData = {
      name: 'guest-user',
    };

    const anotherStudent = await fakeStudentsRepository.create(anotherStudentData);

    await expect(
      updateStudentService.execute({
        studentId: anotherStudent.id,
        data: { name: studentData.name },
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
