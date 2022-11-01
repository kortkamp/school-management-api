import { IPersonsRepository } from '@modules/persons/repositories/IPersonsRepository';
import { RoleTypes } from '@modules/roles/models/IRole';
import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { IUserSchoolRoleRepositories } from '@modules/users/repositories/IUserSchoolRoleRepositories';
import { injectable, inject } from 'tsyringe';

import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTeacherDTO } from '../dtos/ICreateTeacherDTO';
import { ITeachersRepository } from '../repositories/ITeachersRepository';

interface IRequest {
  authSchoolId: string;
  data: ICreateTeacherDTO;
}

@injectable()
class CreateTeacherService {
  constructor(
    @inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,

    @inject('UserSchoolRoleRepositories')
    private userSchoolRoleRepositories: IUserSchoolRoleRepositories,
  ) {}

  public async execute({ authSchoolId, data }: IRequest) {
    const { active = true, school_id = authSchoolId, person_id } = data;
    if (!authSchoolId) {
      throw new ErrorsApp(
        'O Usuário precisa pertencer a uma escola para cadastrar um professor',
        403,
      );
    }

    const teacherRole = await this.rolesRepository.findByType(
      RoleTypes.TEACHER,
    );

    if (!teacherRole) {
      throw new ErrorsApp('A função de professor não existe', 404);
    }

    const personExists = await this.personsRepository.findById(person_id, [
      'user',
    ]);

    if (!personExists) {
      throw new ErrorsApp('A pessoa não existe', 404);
    }

    const teacherExists = await this.teachersRepository.findByPerson(
      school_id,
      person_id,
    );

    if (teacherExists) {
      throw new ErrorsApp('Professor já cadastrado', 409);
    }

    const teacher = await this.teachersRepository.create({
      active,
      school_id,
      person_id,
    });

    await this.userSchoolRoleRepositories.create({
      school_id: authSchoolId,
      user_id: personExists.user.id,
      role_id: teacherRole.id,
    });

    return teacher;
  }
}

export { CreateTeacherService };
