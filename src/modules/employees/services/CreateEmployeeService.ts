import { RoleTypes } from '@modules/roles/models/IRole';
import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { IUser } from '@modules/users/models/IUser';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import path from 'path';
import { injectable, inject } from 'tsyringe';

import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateEmployeeDTO } from '../dtos/ICreateEmployeeDTO';

interface IRequest {
  school_id: string;
  data: ICreateEmployeeDTO;
}

@injectable()
class CreateEmployeeService {
  constructor(
    @inject('UsersRepository')
    private employeesRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({ data, school_id }: IRequest): Promise<IUser> {
    const emailExists = await this.employeesRepository.findByEmail(data.email);

    if (emailExists) {
      throw new ErrorsApp('O Email já está cadastrado', 409);
    }

    const cpfExists = await this.employeesRepository.findByCPF(data.CPF);

    if (cpfExists) {
      throw new ErrorsApp('O CPF já está cadastrado', 409);
    }

    if (!school_id) {
      throw new ErrorsApp(
        'O Usuário precisa pertencer a uma escola para cadastrar um professor',
        403,
      );
    }

    const employeeRole = await this.rolesRepository.findById(data.role_id);

    if (!employeeRole) {
      throw new ErrorsApp('A função não existe', 404);
    }

    Object.assign(data, {
      userSchoolRoles: [{ school_id, role_id: employeeRole.id }],
      active: true,
    });

    const user = await this.employeesRepository.create(data);

    if (data.email) {
      const userToken = await this.userTokensRepository.generate(user.id);

      const templateFile = path.resolve(
        __dirname,
        '..',
        '..',
        'users',
        'views',
        'define_password.hbs',
      );

      const link = `${process.env.CONFIRM_USER_URL}${userToken.token}`;

      const app_name = process.env.APP_NAME;

      const templateHTML = await this.mailTemplateProvider.parse({
        file: templateFile,
        variables: { name: user.name, link, app_name },
      });

      const message = {
        to: user.email,
        from: `${app_name} <no-reply@${process.env.DOMAIN}>`,
        subject: `Inscrição no ${app_name}`,
        html: templateHTML,
      };

      await this.mailProvider.sendMail(message);
    }

    return user;
  }
}

export { CreateEmployeeService };
