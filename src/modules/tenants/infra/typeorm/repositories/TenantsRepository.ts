import { ICreateTenantDTO } from '@modules/tenants/dtos/ICreateTenantDTO';
import { ITenantsRepository } from '@modules/tenants/repositories/ITenantsRepository';
import { Repository } from 'typeorm';

import {
  customRepository,
  tenantWrapper,
} from '@shared/infra/tenantContext/tenantRepository';
import { AppDataSource } from '@shared/infra/typeorm';

import { Tenant } from '../models/Tenant';

class TenantsRepository implements ITenantsRepository {
  private ormRepository: Repository<Tenant>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Tenant>(Tenant).extend(
      customRepository(Tenant),
    );
  }

  public async create(data: ICreateTenantDTO): Promise<Tenant> {
    const newTenant = this.ormRepository.create(data);

    return tenantWrapper(mng => {
      return mng.getRepository(Tenant).save(newTenant);
    }, newTenant.id);
  }

  public async getAll(): Promise<Tenant[]> {
    return this.ormRepository.find();
  }

  public async save(data: Tenant): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<Tenant | undefined> {
    return this.ormRepository.findOne({
      where: { id },
      relations,
    });
  }

  public async delete(tenant: Tenant): Promise<void> {
    await this.ormRepository.remove(tenant);
  }
}

export { TenantsRepository };
