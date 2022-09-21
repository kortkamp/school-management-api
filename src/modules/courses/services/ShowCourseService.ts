import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICoursesRepository } from '../repositories/ICoursesRepository';

@injectable()
class ShowCourseService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}
  public async execute(courseId: string) {
    const course = await this.coursesRepository.findById(courseId);
    if (!course) {
      throw new ErrorsApp('Course does not exists', 404);
    }

    return course;
  }
}

export { ShowCourseService };
