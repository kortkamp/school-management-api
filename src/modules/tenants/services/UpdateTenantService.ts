import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTenantDTO } from '../dtos/ICreateTenantDTO';
import { ITenantsRepository } from '../repositories/ITenantsRepository';

interface IRequest {
  tenantId: string;
  data: Partial<ICreateTenantDTO>;
}

@injectable()
class UpdateTenantService {
  constructor(
    @inject('TenantsRepository')
    private tenantsRepository: ITenantsRepository,
  ) {}
  public async execute({ tenantId, data }: IRequest) {
    const tenant = await this.tenantsRepository.findById(tenantId);

    if (!tenant) {
      throw new ErrorsApp('Tenant not found', 404);
    }

    if (data.name && data.name !== tenant.name) {
      const tenantExists = await this.tenantsRepository.findByName(data.name);

      if (tenantExists) {
        throw new ErrorsApp('Tenant name already exists', 409);
      }
    }

    Object.assign(tenant, data);

    await this.tenantsRepository.save(tenant);

    return tenant;
  }
}

export { UpdateTenantService };
