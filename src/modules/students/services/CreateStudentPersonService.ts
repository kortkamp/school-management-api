import { ICreatePersonDTO } from '@modules/persons/dtos/ICreatePersonDTO';
import { IPersonsRepository } from '@modules/persons/repositories/IPersonsRepository';
import { RoleTypes } from '@modules/roles/models/IRole';
import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUserSchoolRoleRepositories } from '@modules/users/repositories/IUserSchoolRoleRepositories';
import { inject, injectable } from 'tsyringe';

import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

interface IPersonData extends ICreatePersonDTO {
  enroll_id: string;
  course_id: string;
  grade_id: string;
  class_group_id: string;
}

interface IRequest {
  authSchoolId: string;
  authUser: { id: string; tenant_id: string };
  data: IPersonData;
}

@injectable()
class CreateStudentPersonService {
  constructor(
    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,

    @inject('UserSchoolRoleRepositories')
    private userSchoolRoleRepositories: IUserSchoolRoleRepositories,
  ) {}

  public async execute({ authSchoolId, authUser, data }: IRequest) {
    const personExists = await this.personsRepository.findByName(data.name);

    if (personExists) {
      throw new ErrorsApp('Esta pessoa já está cadastrada', 409);
    }

    const studentRole = await this.rolesRepository.findByType(
      RoleTypes.STUDENT,
    );
    if (!studentRole) {
      throw new ErrorsApp('A função de estudante não existe', 400);
    }
    // eslint-disable-next-line no-param-reassign
    data.active = true;

    const hashedPassword = await this.hashProvider.create('123456', 8);

    const user: ICreateUserDTO = {
      name: data.name,
      active: true,
      password: hashedPassword,
      tenant_id: authUser.tenant_id,
    };

    const student = {
      active: true,
      school_id: authSchoolId,
      course_id: data.course_id,
      grade_id: data.grade_id,
      class_group_id: data.class_group_id,
      enroll_id: data.enroll_id,
      enroll_date: new Date().toISOString().split('T')[0],
    };

    const person = await this.personsRepository.create({
      ...data,
      user,
      student,
    });

    await this.userSchoolRoleRepositories.create({
      role_id: studentRole.id,
      user_id: person.user.id,
      school_id: authSchoolId,
    });

    return person;
  }
}

export { CreateStudentPersonService };
