import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICourse } from '../models/ICourse';
import FakeCoursesRepository from '../repositories/fakes/FakeCoursesRepository';
import { DeleteCourseService } from './DeleteCourseService';

let fakeCoursesRepository: FakeCoursesRepository;
let deleteCourseService: DeleteCourseService;
let course: ICourse;

describe('DeleteCourse', () => {
  const newCourseData = {
    name: 'course1',
  };

  beforeEach(async () => {
    fakeCoursesRepository = new FakeCoursesRepository();

    deleteCourseService = new DeleteCourseService(fakeCoursesRepository);

    course = await fakeCoursesRepository.create(newCourseData);
  });

  it('should be able to delete a course', async () => {
    const deleteCourseResult = await deleteCourseService.execute(course.id);

    const courses = await fakeCoursesRepository.getAll();

    expect(courses).toHaveLength(0);

    expect(deleteCourseResult).toBeUndefined();
  });

  it('should not be able to delete a course if it does not exist', async () => {
    await expect(
      deleteCourseService.execute('user non-existing'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
