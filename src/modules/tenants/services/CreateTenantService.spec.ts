import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTenantDTO } from '../dtos/ICreateTenantDTO';
import FakeTenantsRepository from '../repositories/fakes/FakeTenantsRepository';
import { CreateTenantService } from './CreateTenantService';

let fakeTenantsRepository: FakeTenantsRepository;

let createTenantService: CreateTenantService;

let tenantData: ICreateTenantDTO;

describe('CreateTenantService', () => {
  beforeEach(() => {
    fakeTenantsRepository = new FakeTenantsRepository();

    createTenantService = new CreateTenantService(fakeTenantsRepository);

    tenantData = {
      name: 'User',
    };
  });

  it('Should be able to create a new tenant', async () => {
    const tenant = await createTenantService.execute(tenantData);

    expect(tenant).toHaveProperty('id');
    expect(tenant).toHaveProperty('name');

    expect(tenant?.name).toBe(tenantData.name);
  });

  it('Should not create 2 tenants with same name ', async () => {
    await createTenantService.execute(tenantData);

    await expect(createTenantService.execute(tenantData)).rejects.toBeInstanceOf(
      ErrorsApp,
    );
  });
});
