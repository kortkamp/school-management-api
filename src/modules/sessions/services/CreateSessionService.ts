import { authConfig } from '@config/auth';
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

    const schools = user.userSchoolRoles.map(userSchoolRole => ({
      role: userSchoolRole.role.type,
      role_name: userSchoolRole.role.name,
      id: userSchoolRole.school_id,
      name: userSchoolRole.school.name,
    }));

    const token = sign({}, authConfig.jwt.secret, {
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
