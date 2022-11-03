import { ICreateUserSchoolRoleDTO } from '@modules/users/dtos/ICreateUserSchoolRoleDTO';
import { IUserSchoolRoleRepositories } from '@modules/users/repositories/IUserSchoolRoleRepositories';
import { Repository } from 'typeorm';
import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';

import { tenantWrapper } from '@shared/infra/tenantContext/tenantRepository';
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
    const take = query.per_page || 10;
    const skip = query.page ? (query.page - 1) * query.per_page : 0;

    const { filterBy, filterValue } = query;

    const itens = await tenantWrapper(manager => {
      const qb = manager
        .getRepository(UserSchoolRole)
        .createQueryBuilder('schoolRoles');

      qb.andWhere('school_id = :school_id', { school_id });

      if (filterBy[0]) {
        qb.andWhere(`${filterBy[0]} = :filter_value`, {
          filter_value: filterValue[0],
        });
      }

      qb.leftJoin('schoolRoles.user', 'user')
        .addSelect(['user.id', 'user.name', 'user.number_id'])
        .leftJoin('schoolRoles.role', 'role')
        .addSelect(['role.id', 'role.name', 'role.type'])
        .leftJoin('user.person', 'person')
        .addSelect(['person.id', 'person.name'])
        .andWhere('role.is_employee = true')
        .orderBy('schoolRoles.created_at', 'DESC')
        .take(take)
        .skip(skip);

      return qb.getManyAndCount();
    });

    return itens;
  }

  public async delete(user: UserSchoolRole): Promise<void> {
    await this.ormRepository.remove(user);
  }
}

export { UserSchoolRoleRepositories };
