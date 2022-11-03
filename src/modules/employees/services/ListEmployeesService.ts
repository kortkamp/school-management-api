import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { IUserSchoolRole } from '@modules/users/models/IUserSchoolRole';
import { IUserSchoolRoleRepositories } from '@modules/users/repositories/IUserSchoolRoleRepositories';
import { inject, injectable } from 'tsyringe';
import { IFilterQuery } from 'typeorm-dynamic-filters';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';
import ErrorsApp from '@shared/errors/ErrorsApp';

interface IRequest {
  school_id: string;
  query: IFilterQuery;
}

@injectable()
class ListEmployeesService {
  constructor(
    @inject('UserSchoolRoleRepositories')
    private userSchoolRoleRepositories: IUserSchoolRoleRepositories,
  ) {}
  public async execute({
    school_id,
    query,
  }: IRequest): Promise<IListResultInterface> {
    const { page, per_page } = query;

    if (!school_id) {
      throw new ErrorsApp('Nenhuma escola associada', 400);
    }
    const [roles, length] =
      await this.userSchoolRoleRepositories.listSchoolRoles(school_id, query);

    const normalized = roles.map(role => ({
      id: role.user_id,
      name: role.user.name,
      person_name: role.user.person?.name,
      number_id: role.user.number_id,
      role: role.role.name,
      role_id: role.role_id,
    }));

    return {
      result: normalized,
      total_filtered: length,
      page,
      per_page,
      total_pages: Math.ceil(length / per_page),
    };
  }
}

export { ListEmployeesService };
