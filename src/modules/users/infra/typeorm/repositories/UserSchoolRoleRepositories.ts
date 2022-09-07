import { ICreateUserSchoolRoleDTO } from '@modules/users/dtos/ICreateUserSchoolRoleDTO';
import { IUserSchoolRoleRepositories } from '@modules/users/repositories/IUserSchoolRoleRepositories';
import { Repository } from 'typeorm';
import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';

import { AppDataSource } from '@shared/infra/typeorm';

import { UserSchoolRole } from '../models/UserSchoolRole';

class UserSchoolRoleRepositories implements IUserSchoolRoleRepositories {
  private ormRepository: Repository<UserSchoolRole>;

  constructor() {
    this.ormRepository =
      AppDataSource.getRepository<UserSchoolRole>(UserSchoolRole);
  }

  public async find(
    school_id: string,
    user_id: string,
    role_id: string,
  ): Promise<UserSchoolRole | undefined> {
    const role = await this.ormRepository.findOne({
      where: { school_id, role_id, user_id },
    });

    return role;
  }

  public async create(data: ICreateUserSchoolRoleDTO): Promise<UserSchoolRole> {
    const userSchoolRole = await this.ormRepository.create(data);

    await this.ormRepository.save(userSchoolRole);

    return userSchoolRole;
  }

  public async getByUserSchool(
    user_id: string,
    school_id: string,
  ): Promise<UserSchoolRole[]> {
    const userSchoolRoles = await this.ormRepository.find({
      where: { user_id, school_id },
      relations: ['role'],
    });

    return userSchoolRoles;
  }

  public async listSchoolRoles(
    school_id: string,
    query: IFilterQuery,
  ): Promise<[UserSchoolRole[], number]> {
    const filterQueryBuilder = new FilterBuilder(
      this.ormRepository,
      'schoolRoles',
    );

    const qb = filterQueryBuilder.build(query);

    qb.andWhere('school_id = :school_id', { school_id })
      .leftJoin('schoolRoles.user', 'user')
      .addSelect(['user.id', 'user.name'])
      .leftJoin('schoolRoles.role', 'role')
      .addSelect(['role.id', 'role.name', 'role.type']);

    const listRoles = await qb.getManyAndCount();

    return listRoles;
  }

  public async delete(user: UserSchoolRole): Promise<void> {
    await this.ormRepository.remove(user);
  }
}

export { UserSchoolRoleRepositories };
