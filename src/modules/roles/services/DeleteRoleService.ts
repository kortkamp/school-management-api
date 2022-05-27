import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IRolesRepository } from '../repositories/IRolesRepository';

@injectable()
class DeleteRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}
  public async execute(roleId: string) {
    const role = await this.rolesRepository.findById(roleId);
    if (!role) {
      throw new ErrorsApp('Role does not exists', 404);
    }

    await this.rolesRepository.delete(role);
  }
}

export { DeleteRoleService };
