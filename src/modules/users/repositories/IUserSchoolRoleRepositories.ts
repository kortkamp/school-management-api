import { IFilterQuery } from 'typeorm-dynamic-filters';

import { ICreateUserSchoolRoleDTO } from '../dtos/ICreateUserSchoolRoleDTO';
import { IUserSchoolRole } from '../models/IUserSchoolRole';

interface IUserSchoolRoleRepositories {
  find(
    school_id: string,
    user_id: string,
    role_id: string,
  ): Promise<IUserSchoolRole | undefined>;

  create(data: ICreateUserSchoolRoleDTO): Promise<IUserSchoolRole>;

  getByUserSchool(
    user_id: string,
    school_id: string,
  ): Promise<IUserSchoolRole[]>;

  listSchoolRoles(
    school_id: string,
    query: IFilterQuery,
  ): Promise<[IUserSchoolRole[], number]>;

  delete(user: IUserSchoolRole): Promise<void>;
}

export { IUserSchoolRoleRepositories };
