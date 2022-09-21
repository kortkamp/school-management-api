import { inject, injectable } from 'tsyringe';

import { ICoursesRepository } from '../repositories/ICoursesRepository';

@injectable()
class ListCoursesService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}
  public async execute(school_id: string) {
    const courses = await this.coursesRepository.getAll(school_id, ['grades']);

    return courses;
  }
}

export { ListCoursesService };
