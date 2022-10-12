import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ITenantsRepository } from '../repositories/ITenantsRepository';

@injectable()
class ShowTenantService {
  constructor(
    @inject('TenantsRepository')
    private tenantsRepository: ITenantsRepository,
  ) {}
  public async execute(tenantId: string) {
    const tenant = await this.tenantsRepository.findById(tenantId);
    if (!tenant) {
      throw new ErrorsApp('Tenant does not exists', 404);
    }

    return tenant;
  }
}

export { ShowTenantService };
