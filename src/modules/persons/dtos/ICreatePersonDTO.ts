import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';

interface ICreatePersonDTO {
  name: string;
  cpf?: string;
  rg?: string;
  sex: 'M' | 'F';
  birth: Date;
  user?: ICreateUserDTO;
  active?: boolean;
}

export { ICreatePersonDTO };
