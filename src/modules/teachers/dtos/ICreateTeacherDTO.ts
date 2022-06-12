interface ICreateTeacherDTO {
  email: string;
  name: string;
  CPF: string;
  phone: string;
  sex: 'M' | 'F';
  birth: Date;
  role_id: string;
  password: string;
  active?: boolean;
}

export { ICreateTeacherDTO };
