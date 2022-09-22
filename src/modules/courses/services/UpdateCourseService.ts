import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateCourseDTO } from '../dtos/ICreateCourseDTO';
import { ICoursesRepository } from '../repositories/ICoursesRepository';

interface IRequest {
  courseId: string;
  school_id: string;
  data: Partial<ICreateCourseDTO>;
}

@injectable()
class UpdateCourseService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}
  public async execute({ courseId, school_id, data }: IRequest) {
    const course = await this.coursesRepository.findById(courseId, school_id);

    if (!course) {
      throw new ErrorsApp('Course not found', 404);
    }

    if (data.name && data.name !== course.name) {
      const courseExists = await this.coursesRepository.findByName(
        data.name,
        school_id,
      );

      if (courseExists) {
        throw new ErrorsApp('Course name already exists', 409);
      }
    }

    data.grades?.forEach(grade => {
      grade.class_groups?.forEach(class_group => {
        Object.assign(class_group, { school_id });
      });
    });

    // data.grades.forEach(grade => {
    //   grade.class_groups.forEach(class_group => {
    //     console.log(class_group);
    //   });
    //   console.log(grade);
    // });

    Object.assign(course, data);

    return this.coursesRepository.create(course);

    return course;
  }
}

export { UpdateCourseService };
