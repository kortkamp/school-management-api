import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTenantDTO } from '../dtos/ICreateTenantDTO';
import { ITenantsRepository } from '../repositories/ITenantsRepository';

@injectable()
class CreateTenantService {
  constructor(
    @inject('TenantsRepository')
    private tenantsRepository: ITenantsRepository,
  ) {}

  public async execute(data: ICreateTenantDTO) {
    const tenantExists = await this.tenantsRepository.findByName(data.name);

    if (tenantExists) {
      throw new ErrorsApp('Tenant already exists', 409);
    }

    const tenant = await this.tenantsRepository.create(data);

    return tenant;
  }
}

export { CreateTenantService };
