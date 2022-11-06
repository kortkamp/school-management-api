import { ICreateAddressDTO } from '@modules/addresses/dtos/ICreateAddressDTO';
import { ICreateStudentDTO } from '@modules/students/dtos/ICreateStudentDTO';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';

interface ICreatePersonDTO {
  name: string;
  cpf?: string;
  rg?: string;
  sex: 'M' | 'F';
  birth: Date;
  user?: ICreateUserDTO;
  student?: Omit<ICreateStudentDTO, 'person_id'>;
  active?: boolean;
  addresses?: ICreateAddressDTO[];
}

export { ICreatePersonDTO };
