import { RoleTypes } from '../models/IRole';

interface ICreateRoleDTO {
  name: string;
  type: RoleTypes;
}

export { ICreateRoleDTO };
