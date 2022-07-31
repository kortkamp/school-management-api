import { injectable, inject } from 'tsyringe';

import { IUserSchoolRoleRepositories } from '../repositories/IUserSchoolRoleRepositories';

@injectable()
class ListUserSchoolRolesService {
  constructor(
    @inject('UserSchoolRoleRepositories')
    private userSchoolRoleRepositories: IUserSchoolRoleRepositories,
  ) {}

  public async execute(user_id: string, school_id: string) {
    const roles = await this.userSchoolRoleRepositories.getByUserSchool(
      user_id,
      school_id,
    );

    return roles;
  }
}

export { ListUserSchoolRolesService };
