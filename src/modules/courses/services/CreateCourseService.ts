import { IClassGroupsRepository } from '@modules/classGroups/repositories/IClassGroupsRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateCourseDTO } from '../dtos/ICreateCourseDTO';
import { ICoursesRepository } from '../repositories/ICoursesRepository';

interface IRequest {
  school_id: string;
  data: Omit<ICreateCourseDTO, 'school_id'>;
}

@injectable()
class CreateCourseService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
    @inject('ClassGroupsRepository')
    private classGroupsRepository: IClassGroupsRepository,
  ) {}

  public async execute({ data, school_id }: IRequest) {
    const courseExists = await this.coursesRepository.findByName(
      data.name,
      school_id,
    );

    if (courseExists) {
      throw new ErrorsApp('Ja existe um curso com este nome', 409);
    }

    const classGroups = await this.classGroupsRepository.listClassGroups(
      school_id,
    );

    data.grades.forEach(grade => {
      grade.class_groups.forEach(class_group => {
        Object.assign(class_group, { school_id });
        const classGroupExists = classGroups.find(
          c => c.name === class_group.name,
        );
        if (classGroupExists) {
          Object.assign(class_group, { id: classGroupExists.id });
        }
      });
    });

    const course = await this.coursesRepository.create({ ...data, school_id });

    return course;
  }
}

export { CreateCourseService };
