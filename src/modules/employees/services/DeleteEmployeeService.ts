import { RoleTypes } from '@modules/roles/models/IRole';
import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { IUserSchoolRoleRepositories } from '@modules/users/repositories/IUserSchoolRoleRepositories';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

interface IRequest {
  user_id: string;
  role_id: string;
  school_id: string;
}

@injectable()
class DeleteEmployeeService {
  constructor(
    @inject('UserSchoolRoleRepositories')
    private userSchoolRoleRepositories: IUserSchoolRoleRepositories,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}
  public async execute({ school_id, user_id, role_id }: IRequest) {
    if (!school_id) {
      throw new ErrorsApp('Escola não associada', 400);
    }

    const role = await this.rolesRepository.findById(role_id);

    if (role.type === RoleTypes.REGISTER) {
      throw new ErrorsApp(
        'Não é possível excluir a função de registro de instituição',
        403,
      );
    }

    const userSchoolRole = await this.userSchoolRoleRepositories.find(
      school_id,
      user_id,
      role_id,
    );

    if (!userSchoolRole) {
      throw new ErrorsApp('Item não encontrado', 404);
    }

    await this.userSchoolRoleRepositories.delete(userSchoolRole);
  }
}

export { DeleteEmployeeService };
