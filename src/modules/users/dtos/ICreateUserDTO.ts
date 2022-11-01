interface ICreateUserDTO {
  email?: string;
  name: string;
  password?: string;
  active?: boolean;
  tenant_id: string;
}

export { ICreateUserDTO };
