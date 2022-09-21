import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICoursesRepository } from '../repositories/ICoursesRepository';

@injectable()
class DeleteCourseService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}
  public async execute(courseId: string, school_id: string) {
    const course = await this.coursesRepository.findById(courseId, school_id);
    if (!course) {
      throw new ErrorsApp('Curso não encontrado', 404);
    }

    await this.coursesRepository.delete(course);
  }
}

export { DeleteCourseService };
