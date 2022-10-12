import 'reflect-metadata';

import { ICreateTenantDTO } from '../dtos/ICreateTenantDTO';
import FakeTenantsRepository from '../repositories/fakes/FakeTenantsRepository';
import { ListTenantsService } from './ListTenantsService';

let fakeTenantsRepository: FakeTenantsRepository;

let listTenantsService: ListTenantsService;

let tenantData: ICreateTenantDTO;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeTenantsRepository = new FakeTenantsRepository();

    listTenantsService = new ListTenantsService(fakeTenantsRepository);

    tenantData = {
      name: 'tenant1',
    };
  });

  it('Should be able to list tenants', async () => {
    const tenant1 = await fakeTenantsRepository.create(tenantData);

    const tenant2 = await fakeTenantsRepository.create({
      ...tenantData,
      name: 'tenant2',
    });

    const tenants = await listTenantsService.execute();

    expect(tenants).toEqual([tenant1, tenant2]);
  });
});
