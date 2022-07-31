import { RoleTypes } from '@modules/roles/models/IRole';
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

  public async listStudentsResults(
    subject_id: string,
    class_group_id: string,
    student_id?: string,
  ): Promise<User[]> {
    const qb = this.ormRepository.createQueryBuilder('students');
    qb.where({ class_group_id });

    qb.select(['students.id', 'students.name', 'students.enroll_id'])
      .leftJoin('students.results', 'results')
      .addSelect(['results.exam_id', 'results.value'])
      .leftJoin('results.exam', 'exam')
      .addSelect('SUM(results.value)', 'total')
      .groupBy('students.id, results.exam_id, results.student_id')

      .andWhere('exam.subject_id = :subject_id', { subject_id });

    if (student_id) {
      qb.andWhere({ id: student_id });
    }

    return qb.getMany();
  }

  public async listTeachersBySchool(
    school_id: string,
    query: IFilterQuery,
  ): Promise<[User[], number]> {
    const filterQueryBuilder = new FilterBuilder(this.ormRepository, 'teacher');

    const queryBuilder = filterQueryBuilder.build(query);

    queryBuilder
      .select(['teacher.id', 'teacher.name', 'teacher.phone'])
      .leftJoin('teacher.userSchoolRoles', 'userSchoolRoles')
      .where('userSchoolRoles.school_id = :school_id', { school_id })
      .leftJoin('userSchoolRoles.role', 'role')
      .andWhere('role.type = :role_type', { role_type: RoleTypes.TEACHER });

    const result = await queryBuilder.getManyAndCount();

    return result;
  }

  public async findByEmail(
    email: string,
    relations?: string[],
  ): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
      relations,
    });

    return user;
  }

  public async findByEmailWithRoles(email: string): Promise<User | undefined> {
    const qb = this.ormRepository.createQueryBuilder('user');

    qb.where({ email })
      .select([
        'user.id',
        'user.name',
        'user.password',
        'user.active',
        'user.email',
      ])
      .leftJoinAndSelect('user.userSchoolRoles', 'userSchoolRoles')
      .leftJoin('userSchoolRoles.school', 'school')
      .addSelect(['school.id', 'school.name'])
      .leftJoin('userSchoolRoles.role', 'role')
      .addSelect(['role.id', 'role.name', 'role.type']);

    const user = await qb.getOne();
    return user;
  }

  public async findByEnrollId(enroll_id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { enroll_id },
    });

    return user;
  }

  public async findByCPF(CPF: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { CPF },
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
