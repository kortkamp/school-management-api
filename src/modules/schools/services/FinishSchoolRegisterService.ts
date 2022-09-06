import { RoleTypes } from '@modules/roles/models/IRole';
import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSchoolDTO } from '../dtos/ICreateSchoolDTO';
import { ISchoolsRepository } from '../repositories/ISchoolsRepository';

interface IRequest {
  schoolId: string;
  authUserId: string;
}
@injectable()
class FinishSchoolRegisterService {
  constructor(
    @inject('SchoolsRepository')
    private schoolsRepository: ISchoolsRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({ schoolId, authUserId }: IRequest) {
    const principalRole = await this.rolesRepository.findByType(
      RoleTypes.PRINCIPAL,
    );

    if (!principalRole) {
      throw new ErrorsApp('A função de diretor não existe', 404);
    }

    const school = await this.schoolsRepository.findById(schoolId);

    if (!school) {
      throw new ErrorsApp('A escola não existe', 404);
    }

    Object.assign(school, {
      userSchoolRoles: [{ role_id: principalRole.id, user_id: authUserId }],
    });

    return school;
  }
}

export { FinishSchoolRegisterService };
