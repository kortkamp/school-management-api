import 'reflect-metadata';

import { ICreateTeacherDTO } from '../dtos/ICreateTeacherDTO';
import FakeTeachersRepository from '../repositories/fakes/FakeTeachersRepository';
import { ListTeachersService } from './ListTeachersService';

let fakeTeachersRepository: FakeTeachersRepository;

let listTeachersService: ListTeachersService;

let teacherData: ICreateTeacherDTO;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeTeachersRepository = new FakeTeachersRepository();

    listTeachersService = new ListTeachersService(fakeTeachersRepository);

    teacherData = {
      name: 'teacher1',
    };
  });

  it('Should be able to list teachers', async () => {
    const teacher1 = await fakeTeachersRepository.create(teacherData);

    const teacher2 = await fakeTeachersRepository.create({
      ...teacherData,
      name: 'teacher2',
    });

    const teachers = await listTeachersService.execute();

    expect(teachers).toEqual([teacher1, teacher2]);
  });
});
