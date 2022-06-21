import { ICreateClassGroupDTO } from '@modules/classGroups/dtos/ICreateClassGroupDTO';
import { IClassGroupsRepository } from '@modules/classGroups/repositories/IClassGroupsRepository';
import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm';

import { ClassGroup } from '../models/ClassGroup';

class ClassGroupsRepository implements IClassGroupsRepository {
  private ormRepository: Repository<ClassGroup>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<ClassGroup>(ClassGroup);
  }

  public async getTotal(): Promise<number> {
    const result = await this.ormRepository.query(
      'SELECT count(classGroups.id) as total FROM classGroups ',
    );

    return result[0].total;
  }

  public async create(data: ICreateClassGroupDTO): Promise<ClassGroup> {
    const newClassGroup = this.ormRepository.create(data);

    await this.ormRepository.save(newClassGroup);

    return newClassGroup;
  }

  public async getAll(relations: string[] = []): Promise<ClassGroup[]> {
    const qb = this.ormRepository.createQueryBuilder('classGroup');
    qb.leftJoin('classGroup.grade', 'grade')
      .addSelect(['grade.id', 'grade.name'])
      .leftJoin('grade.segment', 'segment')
      .addSelect(['segment.id', 'segment.name'])
      // .leftJoin('classGroup.users', 'users')
      // .addSelect(['users.id', 'users.name'])
      .loadRelationCountAndMap(
        'classGroup.students_count',
        'classGroup.students',
      );

    return qb.getMany();
  }

  public async getAllByTeacher(teacher_id: string): Promise<ClassGroup[]> {
    const queryBuilder = this.ormRepository.createQueryBuilder('classGroups');

    queryBuilder
      .select(['classGroups.id', 'classGroups.name'])
      .leftJoin('classGroups.grade', 'grade')
      .addSelect(['grade.id', 'grade.name'])
      .leftJoin('classGroups.teacherClassGroups', 'teacherClassGroups')
      .leftJoin('teacherClassGroups.subject', 'subject')
      .addSelect(['subject.id', 'subject.name'])
      .addSelect(['teacherClassGroups.subject_id'])
      .where('teacherClassGroups.teacher_id = :teacher_id', { teacher_id });

    const result = await queryBuilder.getMany();

    return result;
  }

  public async save(data: ClassGroup): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<ClassGroup | undefined> {
    const classGroup = await this.ormRepository.findOne({
      where: { id },
      relations,
    });

    return classGroup;
  }

  public async findByName(name: string): Promise<ClassGroup | undefined> {
    const classGroup = await this.ormRepository.findOne({
      where: { name },
    });

    return classGroup;
  }

  public async delete(classGroup: ClassGroup): Promise<void> {
    await this.ormRepository.remove(classGroup);
  }
}

export { ClassGroupsRepository };
