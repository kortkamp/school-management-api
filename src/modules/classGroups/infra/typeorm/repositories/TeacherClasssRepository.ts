import { ICreateTeacherClassDTO } from '@modules/classGroups/dtos/ICreateTeacherClassDTO';
import { ITeacherClassesRepository } from '@modules/classGroups/repositories/ITeacherClassesRepository';
import { Repository } from 'typeorm';
import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';

import { AppDataSource } from '@shared/infra/typeorm';

import { TeacherClass } from '../models/TeacherClass';

class TeacherClassesRepository implements ITeacherClassesRepository {
  private ormRepository: Repository<TeacherClass>;

  constructor() {
    this.ormRepository =
      AppDataSource.getRepository<TeacherClass>(TeacherClass);
  }

  public async create(data: ICreateTeacherClassDTO): Promise<TeacherClass> {
    const newTeacherClass = this.ormRepository.create(data);

    await this.ormRepository.save(newTeacherClass);

    return newTeacherClass;
  }

  public async findByIds(
    data: ICreateTeacherClassDTO,
  ): Promise<TeacherClass | undefined> {
    const teacherClass = await this.ormRepository.findOne({
      where: data,
    });

    return teacherClass;
  }

  public async getAll(query: IFilterQuery): Promise<[TeacherClass[], number]> {
    const filterQueryBuilder = new FilterBuilder(
      this.ormRepository,
      'teacherClasses',
    );

    const queryBuilder = filterQueryBuilder.build(query);

    queryBuilder
      .leftJoin('teacherClasses.classGroup', 'classGroup')
      .addSelect(['classGroup.id', 'classGroup.name'])
      .leftJoin('teacherClasses.subject', 'subject')
      .addSelect(['subject.id', 'subject.name']);

    const result = await queryBuilder.getManyAndCount();

    return result;
  }

  public async delete(teacherClass: TeacherClass): Promise<void> {
    await this.ormRepository.remove(teacherClass);
  }
}

export { TeacherClassesRepository };
