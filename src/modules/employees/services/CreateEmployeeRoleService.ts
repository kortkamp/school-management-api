import { RoleTypes } from '@modules/roles/models/IRole';
import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { IUserSchoolRole } from '@modules/users/models/IUserSchoolRole';
import { IUserSchoolRoleRepositories } from '@modules/users/repositories/IUserSchoolRoleRepositories';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateEmployeeRoleDTO } from '../dtos/ICreateEmployeeRoleDTO';

interface IRequest {
  school_id: string;
  authUserId: string;
  data: ICreateEmployeeRoleDTO;
}

@injectable()
class CreateEmployeeRoleService {
  constructor(
    @inject('UsersRepository')
    private employeesRepository: IUsersRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,

    @inject('UserSchoolRoleRepositories')
    private userSchoolRoleRepositories: IUserSchoolRoleRepositories,
  ) {}

  public async execute({
    data,
    school_id,
    authUserId,
  }: IRequest): Promise<IUserSchoolRole> {
    if (authUserId === data.employee_id) {
      throw new ErrorsApp('Não é permitido alterar sua própria função', 400);
    }

    const employee = await this.employeesRepository.findById(data.employee_id);

    if (!employee) {
      throw new ErrorsApp('O funcionário não existe', 404);
    }

    if (!school_id) {
      throw new ErrorsApp('Escola não associada', 400);
    }

    const role = await this.rolesRepository.findById(data.role_id);

    if (!role) {
      throw new ErrorsApp('A função não existe', 404);
    }

    if (data.role_id === data.prev_role_id) {
      throw new ErrorsApp('A nova função não pode ser igual à anterior', 400);
    }

    if (data.prev_role_id) {
      const prevUserSchoolRole = await this.userSchoolRoleRepositories.find(
        school_id,
        data.employee_id,
        data.prev_role_id,
      );
      if (!prevUserSchoolRole) {
        throw new ErrorsApp('A função anterior não existe', 404);
      }

      const role = await this.rolesRepository.findById(data.prev_role_id);

      if (role.type === RoleTypes.REGISTER) {
        throw new ErrorsApp(
          'Não é possível excluir a função de registro de instituição',
          403,
        );
      }
      await this.userSchoolRoleRepositories.delete(prevUserSchoolRole);
    }

    const userSchoolRole = await this.userSchoolRoleRepositories.create({
      school_id,
      role_id: role.id,
      user_id: employee.id,
    });

    return userSchoolRole;
  }
}

export { CreateEmployeeRoleService };
