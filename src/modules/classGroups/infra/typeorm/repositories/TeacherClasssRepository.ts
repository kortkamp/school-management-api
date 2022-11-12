import { ICreateTeacherClassDTO } from '@modules/classGroups/dtos/ICreateTeacherClassDTO';
import { IListTeacherClassDTO } from '@modules/classGroups/dtos/IListTeacherClassDTO';
import { ITeacherClassesRepository } from '@modules/classGroups/repositories/ITeacherClassesRepository';
import { Repository } from 'typeorm';

import { customRepository } from '@shared/infra/tenantContext/tenantRepository';
import { AppDataSource } from '@shared/infra/typeorm';

import { TeacherClass } from '../models/TeacherClass';

class TeacherClassesRepository implements ITeacherClassesRepository {
  private ormRepository: Repository<TeacherClass>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<TeacherClass>(
      TeacherClass,
    ).extend(customRepository(TeacherClass));
  }

  public async create(data: ICreateTeacherClassDTO): Promise<TeacherClass> {
    const newTeacherClass = this.ormRepository.create(data);

    await this.ormRepository.save(newTeacherClass);

    return newTeacherClass;
  }

  public async createMany(
    data: ICreateTeacherClassDTO[],
  ): Promise<TeacherClass[]> {
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

  public async getAll(
    query: IListTeacherClassDTO,
  ): Promise<[TeacherClass[], number]> {
    const where = query;
    const items = await this.ormRepository.findAndCount({
      relations: ['classGroup', 'teacher', 'subject', 'teacher.person'],
      where,
      select: {
        teacher: {
          id: true,
          person: {
            id: true,
            name: true,
          },
        },
        classGroup: {
          id: true,
          name: true,
        },
        subject: {
          id: true,
          name: true,
        },
        created_at: true,
      },
    });

    return items;
  }

  public async getAllByTeacher(teacher_id: string): Promise<TeacherClass[]> {
    const queryBuilder =
      this.ormRepository.createQueryBuilder('teacherClasses');

    queryBuilder
      .where('teacherClasses.teacher_id = :teacher_id', { teacher_id })
      .leftJoin('teacherClasses.classGroup', 'classGroup')
      .addSelect(['classGroup.id', 'classGroup.name'])
      .leftJoin('teacherClasses.subject', 'subject')
      .addSelect(['subject.id', 'subject.name'])
      .leftJoin('classGroup.grade', 'grade')
      .addSelect(['grade.id', 'grade.name']);

    const result = await queryBuilder.getMany();

    return result;
  }

  public async delete(teacherClass: TeacherClass): Promise<void> {
    await this.ormRepository.remove(teacherClass);
  }
}

export { TeacherClassesRepository };
