import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';
import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { IUser } from '@modules/users/models/IUser';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import path from 'path';
import { injectable, inject } from 'tsyringe';

import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTeacherDTO } from '../dtos/ICreateTeacherDTO';

interface IRequest {
  auth_user: {
    id: string;
    role: string;
    school_id?: string;
  };
  data: ICreateTeacherDTO;
}

@injectable()
class CreateTeacherService {
  constructor(
    @inject('UsersRepository')
    private teachersRepository: IUsersRepository,

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
    const emailExists = await this.teachersRepository.findByEmail(data.email);

    if (emailExists) {
      throw new ErrorsApp('O Email já está cadastrado', 409);
    }

    const cpfExists = await this.teachersRepository.findByCPF(data.CPF);

    if (cpfExists) {
      throw new ErrorsApp('O CPF já está cadastrado', 409);
    }

    const hashedPassword = await this.hashProvider.create(data.password, 8);

    Object.assign(data, { password: hashedPassword, active: false });

    if (!auth_user.school_id) {
      throw new ErrorsApp(
        'O Usuário precisa pertencer a uma escola para cadastrar um professor',
        403,
      );
    }

    const teacherRole = await this.rolesRepository.findByName('teacher');

    if (!teacherRole) {
      throw new ErrorsApp('Teacher Role does not exists', 404);
    }

    Object.assign(data, {
      school_id: auth_user.school_id,
      role_id: teacherRole.id,
    });

    const user = await this.teachersRepository.create(data);

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
        from: 'Sistema de Gestão Escolar <no-reply@template.com>',
        subject: 'Inscrição no Sistema de Gestão Escolar',
        html: templateHTML,
      };

      await this.mailProvider.sendMail(message);
    }

    return user;
  }
}

export { CreateTeacherService };
