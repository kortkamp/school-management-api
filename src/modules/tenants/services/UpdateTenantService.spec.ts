import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTenantDTO } from '../dtos/ICreateTenantDTO';
import { ITenant } from '../models/ITenant';
import FakeTenantsRepository from '../repositories/fakes/FakeTenantsRepository';
import { UpdateTenantService } from './UpdateTenantService';

let fakeTenantsRepository: FakeTenantsRepository;

let updateTenantService: UpdateTenantService;

let tenantData: ICreateTenantDTO;

let tenant: ITenant;

describe('UpdateTenantService', () => {
  beforeEach(async () => {
    fakeTenantsRepository = new FakeTenantsRepository();

    updateTenantService = new UpdateTenantService(fakeTenantsRepository);

    tenantData = {
      name: 'User',
    };

    tenant = await fakeTenantsRepository.create(tenantData);
  });

  it('Should be able to update a tenant', async () => {
    const updateTenantDate = { name: 'Admin' };

    const updatedTenant = await updateTenantService.execute({
      tenantId: tenant.id,
      data: updateTenantDate,
    });

    const storedTenant = await fakeTenantsRepository.findById(tenant.id);

    expect(updatedTenant).toHaveProperty('id');
    expect(updatedTenant).toMatchObject(updateTenantDate);
    expect(updatedTenant?.id).toBe(tenant.id);
    expect(storedTenant).toMatchObject(updateTenantDate);
  });

  it('Should not be able to update a nonexistent tenant', async () => {
    const updateTenantDate = { name: 'Admin' };

    await expect(
      updateTenantService.execute({
        tenantId: 'nonexistent tenant id',
        data: updateTenantDate,
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able to update a tenant name to a already existent tenant name', async () => {
    const anotherTenantData = {
      name: 'guest-user',
    };

    const anotherTenant = await fakeTenantsRepository.create(anotherTenantData);

    await expect(
      updateTenantService.execute({
        tenantId: anotherTenant.id,
        data: { name: tenantData.name },
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
