import { RoleTypes } from '@modules/roles/models/IRole';
import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { IUserSchoolRoleRepositories } from '@modules/users/repositories/IUserSchoolRoleRepositories';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ISchoolsRepository } from '../repositories/ISchoolsRepository';

interface IRequest {
  schoolId: string;
  authUserId: string;
}
@injectable()
class FinishSchoolRegisterService {
  constructor(
    @inject('SchoolsRepository')
    private schoolsRepository: ISchoolsRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,

    @inject('UserSchoolRoleRepositories')
    private userSchoolRoleRepositories: IUserSchoolRoleRepositories,
  ) {}

  public async execute({ schoolId, authUserId }: IRequest) {
    const principalRole = await this.rolesRepository.findByType(
      RoleTypes.PRINCIPAL,
    );

    if (!principalRole) {
      throw new ErrorsApp('A função de diretor não existe', 404);
    }

    const registerRole = await this.rolesRepository.findByType(
      RoleTypes.REGISTER,
    );

    if (!registerRole) {
      throw new ErrorsApp('A função de registro não existe', 404);
    }

    const school = await this.schoolsRepository.findById(schoolId);

    if (!school) {
      throw new ErrorsApp('A escola não existe', 404);
    }

    throw new ErrorsApp('em teste', 400);

    const registerUserSchoolRole = await this.userSchoolRoleRepositories.find(
      schoolId,
      authUserId,
      registerRole.id,
    );

    await this.userSchoolRoleRepositories.delete(registerUserSchoolRole);

    Object.assign(school, {
      userSchoolRoles: [{ role_id: principalRole.id, user_id: authUserId }],
    });

    return school;
  }
}

export { FinishSchoolRegisterService };
