import { ICreateTenantDTO } from '@modules/tenants/dtos/ICreateTenantDTO';
import { FakeTenant } from '@modules/tenants/models/fakes/FakeTenant';
import { ITenant } from '@modules/tenants/models/ITenant';
import { ITenantsRepository } from '@modules/tenants/repositories/ITenantsRepository';

class FakeTenantsRepository implements ITenantsRepository {
  private tenants: ITenant[] = [];

  public async findById(user_id: string): Promise<ITenant | undefined> {
    const findUser = this.tenants.find(user => user.id === user_id);

    return findUser;
  }

  public async findByName(email: string): Promise<ITenant | undefined> {
    const tenant = this.tenants.find(user => user.name === email);

    return tenant;
  }

  public async create(data: ICreateTenantDTO): Promise<ITenant> {
    const tenant = new FakeTenant(data);
    this.tenants.push(tenant);
    return tenant;
  }

  public async update(tenant: ITenant): Promise<ITenant> {
    this.tenants = this.tenants.map(oldTenant =>
      oldTenant.id !== tenant.id ? oldTenant : tenant,
    );

    return tenant;
  }

  public async getAll(): Promise<ITenant[]> {
    return this.tenants;
  }

  public async getTotal(): Promise<number> {
    return this.tenants.length;
  }

  public async save(data: ITenant): Promise<void> {
    const searchUser = this.tenants.findIndex(user => user.id === data.id);

    if (searchUser >= 0) {
      Object.assign(this.tenants[searchUser], data);
    }
  }

  public async delete(user: ITenant): Promise<void> {
    const listWithRemovedUsers = this.tenants.filter(item => item.id !== user.id);
    this.tenants = listWithRemovedUsers;
  }
}

export default FakeTenantsRepository;
