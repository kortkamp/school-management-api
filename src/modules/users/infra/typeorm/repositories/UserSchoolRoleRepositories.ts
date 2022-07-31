import { IUserSchoolRoleRepositories } from '@modules/users/repositories/IUserSchoolRoleRepositories';
import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm';

import { UserSchoolRole } from '../models/UserSchoolRole';

class UserSchoolRoleRepositories implements IUserSchoolRoleRepositories {
  private ormRepository: Repository<UserSchoolRole>;

  constructor() {
    this.ormRepository =
      AppDataSource.getRepository<UserSchoolRole>(UserSchoolRole);
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
}

export { UserSchoolRoleRepositories };
