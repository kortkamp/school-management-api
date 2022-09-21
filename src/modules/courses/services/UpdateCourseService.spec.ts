import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateCourseDTO } from '../dtos/ICreateCourseDTO';
import { ICourse } from '../models/ICourse';
import FakeCoursesRepository from '../repositories/fakes/FakeCoursesRepository';
import { UpdateCourseService } from './UpdateCourseService';

let fakeCoursesRepository: FakeCoursesRepository;

let updateCourseService: UpdateCourseService;

let courseData: ICreateCourseDTO;

let course: ICourse;

describe('UpdateCourseService', () => {
  beforeEach(async () => {
    fakeCoursesRepository = new FakeCoursesRepository();

    updateCourseService = new UpdateCourseService(fakeCoursesRepository);

    courseData = {
      name: 'User',
    };

    course = await fakeCoursesRepository.create(courseData);
  });

  it('Should be able to update a course', async () => {
    const updateCourseDate = { name: 'Admin' };

    const updatedCourse = await updateCourseService.execute({
      courseId: course.id,
      data: updateCourseDate,
    });

    const storedCourse = await fakeCoursesRepository.findById(course.id);

    expect(updatedCourse).toHaveProperty('id');
    expect(updatedCourse).toMatchObject(updateCourseDate);
    expect(updatedCourse?.id).toBe(course.id);
    expect(storedCourse).toMatchObject(updateCourseDate);
  });

  it('Should not be able to update a nonexistent course', async () => {
    const updateCourseDate = { name: 'Admin' };

    await expect(
      updateCourseService.execute({
        courseId: 'nonexistent course id',
        data: updateCourseDate,
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able to update a course name to a already existent course name', async () => {
    const anotherCourseData = {
      name: 'guest-user',
    };

    const anotherCourse = await fakeCoursesRepository.create(anotherCourseData);

    await expect(
      updateCourseService.execute({
        courseId: anotherCourse.id,
        data: { name: courseData.name },
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
