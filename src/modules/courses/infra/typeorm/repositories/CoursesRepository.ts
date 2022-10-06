import { ICreateCourseDTO } from '@modules/courses/dtos/ICreateCourseDTO';
import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';
import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm';

import { Course } from '../models/Course';

class CoursesRepository implements ICoursesRepository {
  private ormRepository: Repository<Course>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Course>(Course);
  }

  public async create(data: ICreateCourseDTO): Promise<Course> {
    const newCourse = this.ormRepository.create(data);

    await this.ormRepository.save(newCourse);

    return newCourse;
  }

  public async getAll(
    school_id: string,
    relations: string[] = [],
  ): Promise<Course[]> {
    const qb = this.ormRepository.createQueryBuilder('courses');

    qb.select([
      'courses.id',
      'courses.name',
      'courses.total_hours',
      'courses.phase_name',
      'courses.phases_number',
      'courses.segment_id',
    ]);
    qb.where('courses.school_id = :school_id', { school_id });
    qb.leftJoin('courses.grades', 'grades')
      .addSelect([
        'grades.id',
        'grades.name',
        'grades.days',
        'grades.total_hours',
      ])
      .leftJoin('grades.class_groups', 'class_groups')
      .addSelect(['class_groups.id', 'class_groups.name'])
      .orderBy('grades.name', 'ASC')
      .addOrderBy('courses.created_at', 'ASC')
      .addOrderBy('class_groups.name', 'ASC');
    // return this.ormRepository.find({ where: { school_id }, relations });
    return qb.getMany();
  }

  public async save(data: Course): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(
    id: string,
    school_id: string,
    relations?: string[],
  ): Promise<Course | undefined> {
    const course = await this.ormRepository.findOne({
      where: { id, school_id },
      relations,
    });

    return course;
  }

  public async findByName(
    name: string,
    school_id: string,
  ): Promise<Course | undefined> {
    const course = await this.ormRepository.findOne({
      where: { name, school_id },
    });

    return course;
  }

  public async delete(course: Course): Promise<void> {
    await this.ormRepository.remove(course);
  }
}

export { CoursesRepository };
