import { RoleTypes } from '../models/IRole';

interface ICreateRoleDTO {
  name: string;
  type: RoleTypes;
  is_employee: boolean;
}

export { ICreateRoleDTO };
