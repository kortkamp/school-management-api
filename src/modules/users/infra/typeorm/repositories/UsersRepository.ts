import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { Repository } from 'typeorm';
import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';

import { AppDataSource } from '@shared/infra/typeorm';

import { User } from '../models/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<User>(User);
  }

  public async getTotal(): Promise<number> {
    const total = await this.ormRepository.count();

    return total;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const newUser = this.ormRepository.create(data);

    await this.ormRepository.save(newUser);

    return newUser;
  }

  public async getAll(query: IFilterQuery): Promise<[User[], number]> {
    const filterQueryBuilder = new FilterBuilder(this.ormRepository, 'user');

    const queryBuilder = filterQueryBuilder.build(query);

    const result = await queryBuilder.getManyAndCount();

    return result;
  }
  public async listStudents(query: IFilterQuery): Promise<[User[], number]> {
    const filterQueryBuilder = new FilterBuilder(this.ormRepository, 'student');

    const queryBuilder = filterQueryBuilder.build(query);

    queryBuilder
      .select([
        'student.id',
        'student.name',
        'student.enroll_id',
        'student.phone',
      ])
      .leftJoin('student.segment', 'segment')
      .addSelect(['segment.id', 'segment.name'])
      .leftJoin('student.grade', 'grade')
      .addSelect(['grade.id', 'grade.name'])
      .leftJoin('student.classGroup', 'classGroup')
      .addSelect(['classGroup.id', 'classGroup.name']);

    const result = await queryBuilder.getManyAndCount();

    return result;
  }
  public async listTeachers(query: IFilterQuery): Promise<[User[], number]> {
    const filterQueryBuilder = new FilterBuilder(this.ormRepository, 'teacher');

    const queryBuilder = filterQueryBuilder.build(query);

    queryBuilder
      .select([
        'teacher.id',
        'teacher.name',
        'teacher.enroll_id',
        'teacher.phone',
      ])
      .leftJoin('teacher.segment', 'segment')
      .addSelect(['segment.id', 'segment.name'])
      .leftJoin('teacher.grade', 'grade')
      .addSelect(['grade.id', 'grade.name'])
      .leftJoin('teacher.classGroup', 'classGroup')
      .addSelect(['classGroup.id', 'classGroup.name']);

    const result = await queryBuilder.getManyAndCount();

    return result;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async save(data: User): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
      relations,
    });

    return user;
  }

  public async delete(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }
}

export { UsersRepository };
