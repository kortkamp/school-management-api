import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ITenant } from '../models/ITenant';
import FakeTenantsRepository from '../repositories/fakes/FakeTenantsRepository';
import { DeleteTenantService } from './DeleteTenantService';

let fakeTenantsRepository: FakeTenantsRepository;
let deleteTenantService: DeleteTenantService;
let tenant: ITenant;

describe('DeleteTenant', () => {
  const newTenantData = {
    name: 'tenant1',
  };

  beforeEach(async () => {
    fakeTenantsRepository = new FakeTenantsRepository();

    deleteTenantService = new DeleteTenantService(fakeTenantsRepository);

    tenant = await fakeTenantsRepository.create(newTenantData);
  });

  it('should be able to delete a tenant', async () => {
    const deleteTenantResult = await deleteTenantService.execute(tenant.id);

    const tenants = await fakeTenantsRepository.getAll();

    expect(tenants).toHaveLength(0);

    expect(deleteTenantResult).toBeUndefined();
  });

  it('should not be able to delete a tenant if it does not exist', async () => {
    await expect(
      deleteTenantService.execute('user non-existing'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
