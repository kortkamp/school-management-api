import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUser } from '@modules/users/models/IUser';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import path from 'path';
import { injectable, inject } from 'tsyringe';

import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

interface IRequest {
  auth_user: {
    id: string;
    role: string;
    school_id?: string;
  };
  data: ICreateUserDTO;
}

@injectable()
class CreateStudentService {
  constructor(
    @inject('UsersRepository')
    private studentsRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({ auth_user, data }: IRequest): Promise<IUser> {
    if (data.email) {
      const emailExists = await this.studentsRepository.findByEmail(data.email);

      if (emailExists) {
        throw new ErrorsApp('Email already registered', 409);
      }
    }

    if (data.password) {
      const hashedPassword = await this.hashProvider.create(data.password, 8);

      Object.assign(data, { password: hashedPassword, active: false });
    }

    if (!auth_user.school_id) {
      throw new ErrorsApp(
        'O Usuário precisa pertencer a uma escola para cadastrar um aluno',
        403,
      );
    }

    const studentRole = await this.rolesRepository.findByName('student');

    if (!studentRole) {
      throw new ErrorsApp('Student Role does not exists', 404);
    }

    Object.assign(data, {
      school_id: auth_user.school_id,
      role_id: studentRole.id,
    });

    const user = await this.studentsRepository.create(data);

    if (data.email) {
      const userToken = await this.userTokensRepository.generate(user.id);

      const templateFile = path.resolve(
        __dirname,
        '..',
        '..',
        'users',
        'views',
        'confirm_user.hbs',
      );

      const link = `${process.env.CONFIRM_USER_URL}${userToken.token}`;

      const templateHTML = await this.mailTemplateProvider.parse({
        file: templateFile,
        variables: { name: user.name, link },
      });

      const message = {
        to: user.email,
        from: 'Template API <no-reply@template.com>',
        subject: 'Signup in Template API Confirmation',
        html: templateHTML,
      };

      await this.mailProvider.sendMail(message);
    }

    return user;
  }
}

export { CreateStudentService };
