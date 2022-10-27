interface ICreatePersonDTO {
  name: string;
  cpf?: string;
  rg?: string;
  sex: 'M' | 'F';
  birth: Date;
}

export { ICreatePersonDTO };
