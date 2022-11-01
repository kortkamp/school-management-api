import { IUser } from '@modules/users/models/IUser';

interface IPerson {
  id: string;

  name: string;

  cpf?: string; // unique

  rg?: string;

  sex: 'M' | 'F';

  birth: Date;

  user?: IUser;

  active: boolean;

  tenant_id: string;

  created_at: Date;

  updated_at: Date;
}

export { IPerson };
