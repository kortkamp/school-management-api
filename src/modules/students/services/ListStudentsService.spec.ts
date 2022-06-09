import 'reflect-metadata';

import { ICreateStudentDTO } from '../dtos/ICreateStudentDTO';
import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';
import { ListStudentsService } from './ListStudentsService';

let fakeStudentsRepository: FakeStudentsRepository;

let listStudentsService: ListStudentsService;

let studentData: ICreateStudentDTO;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();

    listStudentsService = new ListStudentsService(fakeStudentsRepository);

    studentData = {
      name: 'student1',
    };
  });

  it('Should be able to list students', async () => {
    const student1 = await fakeStudentsRepository.create(studentData);

    const student2 = await fakeStudentsRepository.create({
      ...studentData,
      name: 'student2',
    });

    const students = await listStudentsService.execute();

    expect(students).toEqual([student1, student2]);
  });
});
