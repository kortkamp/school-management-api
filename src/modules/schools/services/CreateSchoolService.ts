import { RoleTypes } from '@modules/roles/models/IRole';
import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSchoolDTO } from '../dtos/ICreateSchoolDTO';
import { ISchoolsRepository } from '../repositories/ISchoolsRepository';

interface IRequest {
  data: ICreateSchoolDTO;
  authUserId: string;
}
@injectable()
class CreateSchoolService {
  constructor(
    @inject('SchoolsRepository')
    private schoolsRepository: ISchoolsRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({ data, authUserId }: IRequest) {
    const teacherRole = await this.rolesRepository.findByType(
      RoleTypes.PRINCIPAL,
    );

    if (!teacherRole) {
      throw new ErrorsApp('A função diretor não existe', 404);
    }
    Object.assign(data, {
      userSchoolRoles: [{ role_id: teacherRole.id, user_id: authUserId }],
    });
    const School = await this.schoolsRepository.create(data);

    return School;
  }
}

export { CreateSchoolService };
