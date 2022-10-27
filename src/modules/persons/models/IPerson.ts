interface IPerson {
  id: string;

  name: string;

  cpf?: string; // unique

  rg?: string;

  sex: 'M' | 'F';

  birth: Date;

  tenant_id: string;

  created_at: Date;

  updated_at: Date;
}

export { IPerson };
