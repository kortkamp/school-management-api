import { authConfig } from '@config/auth';
import { RoleTypes } from '@modules/roles/models/IRole';
import { IStudentsRepository } from '@modules/students/repositories/IStudentsRepository';
import { ITeachersRepository } from '@modules/teachers/repositories/ITeachersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSessionDTO } from '../dtos/ICreateSessionDTO';

interface IResponse {
  id: string;
  name: string;
  email: string;
  avatar: string;
  schools: any[];
  token: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,

    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: ICreateSessionDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmailWithRoles(email);

    if (!user) {
      throw new ErrorsApp('Email/password inválidos', 403);
    }

    // const role = await this.rolesRepository.findById(user.role_id);

    // if (!role) {
    //   throw new ErrorsApp('Role does not exists', 403);
    // }

    const checkPasswordMatch = await this.hashProvider.verify(
      user.password,
      password,
    );

    if (!checkPasswordMatch) {
      throw new ErrorsApp('Email/password inválidos', 403);
    }

    if (!user.active) {
      throw new ErrorsApp(
        'O usuário não está ativo, por favor contate o administrador',
        403,
      );
    }

    const getSchoolRolesPromise = user.userSchoolRoles.map(
      async userSchoolRole => {
        const partialUserSchoolRole = {
          role: userSchoolRole.role.type,
          role_name: userSchoolRole.role.name,
          id: userSchoolRole.school_id,
          name: userSchoolRole.school.name,
        };

        // get teacher data
        if (userSchoolRole.role.type === RoleTypes.TEACHER) {
          const teacher = await this.teachersRepository.findByPersonTenant(
            userSchoolRole.school_id,
            user.person_id,
            user.tenant_id,
          );
          Object.assign(partialUserSchoolRole, { teacher_id: teacher?.id });
        }

        // get student data
        if (userSchoolRole.role.type === RoleTypes.STUDENT) {
          const student = await this.studentsRepository.findByPersonTenant(
            userSchoolRole.school_id,
            user.person_id,
            user.tenant_id,
          );
          Object.assign(partialUserSchoolRole, {
            student_id: student?.id,
            class_group_id: student.class_group_id,
          });
        }

        return partialUserSchoolRole;
      },
    );

    const schools = await Promise.all(getSchoolRolesPromise);

    const token = sign({ tenant_id: user.tenant_id }, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar ? `${process.env.AVATAR_URL}${user.avatar}` : null,
      schools,
      token,
    };
  }
}

export { CreateSessionService };
