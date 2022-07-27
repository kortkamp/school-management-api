import { ICreateAddressDTO } from '../dtos/ICreateAddressDTO';
import { IAddress } from '../models/IAddress';

interface IAddressesRepository {
  create(data: ICreateAddressDTO): Promise<IAddress>;
  findById(addressId: string): Promise<IAddress | undefined>;
  save(dataUpdate: IAddress): Promise<void>;
  delete(address: IAddress): Promise<void>;
}

export { IAddressesRepository };
