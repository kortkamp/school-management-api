import { ICreateAddressDTO } from '@modules/addresses/dtos/ICreateAddressDTO';
import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';
import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm';

import { Address } from '../models/Address';

class AddressesRepository implements IAddressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Address>(Address);
  }

  public async create(data: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create(data);

    await this.ormRepository.save(address);

    return address;
  }

  public async save(data: Address): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      where: { id },
    });

    return address;
  }

  public async delete(address: Address): Promise<void> {
    await this.ormRepository.remove(address);
  }
}

export { AddressesRepository };
