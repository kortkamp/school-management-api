import { RoleTypes } from '@modules/roles/models/IRole';
import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUser } from '@modules/users/models/IUser';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

interface IRequest {
  school_id: string;
  data: ICreateUserDTO;
}

@injectable()
class CreateStudentService {
  constructor(
    @inject('UsersRepository')
    private studentsRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({ school_id, data }: IRequest): Promise<IUser> {
    if (data.email) {
      const emailExists = await this.studentsRepository.findByEmail(data.email);

      if (emailExists) {
        throw new ErrorsApp('Email already registered', 409);
      }
    }

    if (data.enroll_id) {
      const enrollExists = await this.studentsRepository.findByEnrollId(
        data.enroll_id,
      );

      if (enrollExists) {
        throw new ErrorsApp('A matrícula já está cadastrada', 409);
      }
    }

    if (data.password) {
      const hashedPassword = await this.hashProvider.create(data.password, 8);

      Object.assign(data, { password: hashedPassword, active: false });
    }

    if (!school_id) {
      throw new ErrorsApp(
        'O Usuário precisa pertencer a uma escola para cadastrar um aluno',
        403,
      );
    }

    const studentRole = await this.rolesRepository.findByType(
      RoleTypes.STUDENT,
    );

    if (!studentRole) {
      throw new ErrorsApp('A função de estudante não existe', 500);
    }

    Object.assign(data, {
      userSchoolRoles: [{ school_id, role_id: studentRole.id }],
      active: true,
    });

    const user = await this.studentsRepository.create(data);

    return user;
  }
}

export { CreateStudentService };
