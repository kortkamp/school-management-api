import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateCourseDTO } from '../dtos/ICreateCourseDTO';
import FakeCoursesRepository from '../repositories/fakes/FakeCoursesRepository';
import { CreateCourseService } from './CreateCourseService';

let fakeCoursesRepository: FakeCoursesRepository;

let createCourseService: CreateCourseService;

let courseData: ICreateCourseDTO;

describe('CreateCourseService', () => {
  beforeEach(() => {
    fakeCoursesRepository = new FakeCoursesRepository();

    createCourseService = new CreateCourseService(fakeCoursesRepository);

    courseData = {
      name: 'User',
    };
  });

  it('Should be able to create a new course', async () => {
    const course = await createCourseService.execute(courseData);

    expect(course).toHaveProperty('id');
    expect(course).toHaveProperty('name');

    expect(course?.name).toBe(courseData.name);
  });

  it('Should not create 2 courses with same name ', async () => {
    await createCourseService.execute(courseData);

    await expect(createCourseService.execute(courseData)).rejects.toBeInstanceOf(
      ErrorsApp,
    );
  });
});
