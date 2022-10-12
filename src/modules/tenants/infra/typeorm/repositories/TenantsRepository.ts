import { ICreateTenantDTO } from '@modules/tenants/dtos/ICreateTenantDTO';
import { ITenantsRepository } from '@modules/tenants/repositories/ITenantsRepository';
import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm';

import { Tenant } from '../models/Tenant';

class TenantsRepository implements ITenantsRepository {
  private ormRepository: Repository<Tenant>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Tenant>(Tenant);
  }

  public async create(data: ICreateTenantDTO): Promise<Tenant> {
    const newTenant = this.ormRepository.create(data);

    await this.ormRepository.save(newTenant);

    return newTenant;
  }

  public async getAll(relations: string[] = []): Promise<Tenant[]> {
    return this.ormRepository.find({ relations });
  }

  public async save(data: Tenant): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<Tenant | undefined> {
    const tenant = await this.ormRepository.findOne({
      where: { id },
      relations,
    });

    return tenant;
  }

  public async delete(tenant: Tenant): Promise<void> {
    await this.ormRepository.remove(tenant);
  }
}

export { TenantsRepository };
