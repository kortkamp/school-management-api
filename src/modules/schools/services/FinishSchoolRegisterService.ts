import { RoleTypes } from '@modules/roles/models/IRole';
import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { IUserSchoolRoleRepositories } from '@modules/users/repositories/IUserSchoolRoleRepositories';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ISchoolsRepository } from '../repositories/ISchoolsRepository';

interface IRequest {
  schoolId: string;
  authUserId: string;
  newRoleId: string;
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

  public async execute({ schoolId, authUserId, newRoleId }: IRequest) {
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

    const registerUserSchoolRole = await this.userSchoolRoleRepositories.find(
      schoolId,
      authUserId,
      registerRole.id,
    );

    const newRole = await this.rolesRepository.findById(newRoleId);
    if (!newRole) {
      throw new ErrorsApp('Função não encontrada', 404);
    }

    await this.userSchoolRoleRepositories.delete(registerUserSchoolRole);

    Object.assign(school, {
      userSchoolRoles: [{ role_id: newRoleId, user_id: authUserId }],
    });

    await this.userSchoolRoleRepositories.create({
      role_id: newRoleId,
      school_id: schoolId,
      user_id: authUserId,
    });

    const response = {
      id: school.id,
      name: school.name,
      role: newRole.type,
      role_name: newRole.name,
    };

    return response;
  }
}

export { FinishSchoolRegisterService };
