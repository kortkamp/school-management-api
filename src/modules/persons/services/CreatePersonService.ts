import { RoleTypes } from '@modules/roles/models/IRole';
import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { ITeachersRepository } from '@modules/teachers/repositories/ITeachersRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUserSchoolRoleRepositories } from '@modules/users/repositories/IUserSchoolRoleRepositories';
import { inject, injectable } from 'tsyringe';

import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreatePersonDTO } from '../dtos/ICreatePersonDTO';
import { IPersonsRepository } from '../repositories/IPersonsRepository';

interface IPersonData extends ICreatePersonDTO {
  role_id: string;
}

interface IRequest {
  authSchoolId: string;
  authUser: { id: string; tenant_id: string };
  data: IPersonData;
}

@injectable()
class CreatePersonService {
  constructor(
    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,

    @inject('UserSchoolRoleRepositories')
    private userSchoolRoleRepositories: IUserSchoolRoleRepositories,

    @inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,
  ) {}

  public async execute({ authSchoolId, authUser, data }: IRequest) {
    const personExists = await this.personsRepository.findByName(data.name);

    if (personExists) {
      throw new ErrorsApp('Esta pessoa já está cadastrada', 409);
    }

    const hashedPassword = await this.hashProvider.create('123456', 8);

    const user: ICreateUserDTO = {
      email: data.contact.email,
      name: data.name,
      active: true,
      password: hashedPassword,
      tenant_id: authUser.tenant_id,
    };

    const person = await this.personsRepository.create({ ...data, user });

    if (data.role_id) {
      const roleExists = await this.rolesRepository.findById(data.role_id);
      if (!roleExists) {
        throw new ErrorsApp('A função informada não existe', 400);
      }
      // eslint-disable-next-line no-param-reassign
      data.active = true;

      if (roleExists.type === RoleTypes.TEACHER) {
        await this.teachersRepository.create({
          active: true,
          person_id: person.id,
          school_id: authSchoolId,
        });
      }

      await this.userSchoolRoleRepositories.create({
        role_id: data.role_id,
        user_id: person.user.id,
        school_id: authSchoolId,
      });
    }

    return person;
  }
}

export { CreatePersonService };
