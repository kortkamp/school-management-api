import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateRoleDTO } from '../dtos/ICreateRoleDTO';
import { IRolesRepository } from '../repositories/IRolesRepository';

@injectable()
class CreateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute(data: ICreateRoleDTO) {
    const role = await this.rolesRepository.create(data);

    return role;
  }
}

export { CreateRoleService };
