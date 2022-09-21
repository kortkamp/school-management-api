import 'reflect-metadata';

import { ICreateCourseDTO } from '../dtos/ICreateCourseDTO';
import FakeCoursesRepository from '../repositories/fakes/FakeCoursesRepository';
import { ListCoursesService } from './ListCoursesService';

let fakeCoursesRepository: FakeCoursesRepository;

let listCoursesService: ListCoursesService;

let courseData: ICreateCourseDTO;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeCoursesRepository = new FakeCoursesRepository();

    listCoursesService = new ListCoursesService(fakeCoursesRepository);

    courseData = {
      name: 'course1',
    };
  });

  it('Should be able to list courses', async () => {
    const course1 = await fakeCoursesRepository.create(courseData);

    const course2 = await fakeCoursesRepository.create({
      ...courseData,
      name: 'course2',
    });

    const courses = await listCoursesService.execute();

    expect(courses).toEqual([course1, course2]);
  });
});
