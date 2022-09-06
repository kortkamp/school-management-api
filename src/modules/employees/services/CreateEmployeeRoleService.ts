import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { IUser } from '@modules/users/models/IUser';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateEmployeeRoleDTO } from '../dtos/ICreateEmployeeRoleDTO';

interface IRequest {
  school_id: string;
  data: ICreateEmployeeRoleDTO;
}

@injectable()
class CreateEmployeeRoleService {
  constructor(
    @inject('UsersRepository')
    private employeesRepository: IUsersRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({ data, school_id }: IRequest): Promise<IUser> {
    const employee = await this.employeesRepository.findById(data.employee_id);

    if (!employee) {
      throw new ErrorsApp('O funcionário não existe', 404);
    }

    if (!school_id) {
      throw new ErrorsApp(
        'O Usuário precisa pertencer a uma escola para cadastrar um professor',
        400,
      );
    }

    const role = await this.rolesRepository.findById(data.role_id);

    if (!role) {
      throw new ErrorsApp('A função não existe', 404);
    }

    Object.assign(employee, {
      userSchoolRoles: [{ school_id, role_id: role.id }],
    });

    await this.employeesRepository.save(employee);

    return employee;
  }
}

export { CreateEmployeeRoleService };
