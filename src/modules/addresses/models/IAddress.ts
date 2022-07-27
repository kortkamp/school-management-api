interface IAddress {
  id: string;

  street: string;

  number: string;

  complement: string;

  district: string;

  city: string;

  state: string;

  CEP: string;

  created_at: Date;
}

export { IAddress };
