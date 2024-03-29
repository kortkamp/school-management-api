import { RoleTypes } from '@modules/roles/models/IRole';
import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { ISchoolsRepository } from '@modules/schools/repositories/ISchoolsRepository';
import { ITenantsRepository } from '@modules/tenants/repositories/ITenantsRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import path from 'path';
import { injectable, inject } from 'tsyringe';

import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { IUser } from '../models/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUserTokensRepository } from '../repositories/IUserTokensRepository';

interface IRequest extends ICreateUserDTO {
  tenant_name: string;
  school_name: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TenantsRepository')
    private tenantsRepository: ITenantsRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('SchoolsRepository')
    private schoolsRepository: ISchoolsRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: IRequest): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(data.email);

    if (emailExists) {
      throw new ErrorsApp('Este e-mail já está registrado no sistema', 409);
    }

    const hashedPassword = await this.hashProvider.create(data.password, 8);

    Object.assign(data, { password: hashedPassword, active: false });

    const tenant = await this.tenantsRepository.create({
      name: data.tenant_name,
    });

    Object.assign(data, { tenant_id: tenant.id });

    const user = await this.usersRepository.create(data);

    const userToken = await this.userTokensRepository.generate(user.id);

    const newUserRole = await this.rolesRepository.findByType(
      RoleTypes.REGISTER,
    );

    if (!newUserRole) {
      throw new ErrorsApp('A função cadastro de escola não existe', 404);
    }

    const schoolData = { name: data.school_name };

    Object.assign(schoolData, {
      userSchoolRoles: [{ role_id: newUserRole.id, user_id: user.id }],
    });

    await this.schoolsRepository.create(schoolData);

    const templateFile = path.resolve(
      __dirname,
      '..',
      'views',
      'confirm_user.hbs',
    );

    const link = `${process.env.CONFIRM_USER_URL}${userToken.token}`;

    const app_name = process.env.APP_NAME;

    const templateHTML = await this.mailTemplateProvider.parse({
      file: templateFile,
      variables: { name: user.name, link, app_name },
    });

    const message = {
      to: user.email,
      from: `${app_name} <no-reply@template.com>`,
      subject: `Confirmação de registro no ${app_name}`,
      html: templateHTML,
    };

    await this.mailProvider.sendMail(message);

    return user;
  }
}

export { CreateUserService };
