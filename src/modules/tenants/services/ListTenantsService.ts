import { inject, injectable } from 'tsyringe';

import { ITenantsRepository } from '../repositories/ITenantsRepository';

@injectable()
class ListTenantsService {
  constructor(
    @inject('TenantsRepository')
    private tenantsRepository: ITenantsRepository,
  ) {}
  public async execute() {
    const tenants = await this.tenantsRepository.getAll();

    return tenants;
  }
}

export { ListTenantsService };
