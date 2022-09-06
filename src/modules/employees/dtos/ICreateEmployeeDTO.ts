import { ICreateAddressDTO } from '@modules/addresses/dtos/ICreateAddressDTO';

interface ICreateEmployeeDTO {
  email: string;
  name: string;
  CPF: string;
  phone: string;
  sex: 'M' | 'F';
  birth: Date;
  role_id: string;
  password: string;
  active?: boolean;
  address: ICreateAddressDTO;
}

export { ICreateEmployeeDTO };
