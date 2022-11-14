import { ICreateAddressDTO } from '@modules/addresses/dtos/ICreateAddressDTO';
import { ICreateContactDTO } from '@modules/contacts/dtos/ICreateContactDTO';
import { ICreateStudentDTO } from '@modules/students/dtos/ICreateStudentDTO';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';

interface IPersonAddress extends ICreateAddressDTO {
  id?: string;
}

interface ICreatePersonDTO {
  name: string;
  cpf?: string;
  rg?: string;
  sex: 'M' | 'F';
  birth: Date;
  user?: ICreateUserDTO;
  student?: Omit<ICreateStudentDTO, 'person_id'>;
  active?: boolean;
  addresses?: IPersonAddress[];
  contact?: ICreateContactDTO;
}

export { ICreatePersonDTO };
