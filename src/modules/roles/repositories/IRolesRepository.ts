import { ICreateRoleDTO } from '../dtos/ICreateRoleDTO';
import { IRole, RoleTypes } from '../models/IRole';

interface IRolesRepository {
  create(data: ICreateRoleDTO): Promise<IRole>;
  getAll(relations?: string[]): Promise<IRole[]>;
  findById(userId: string, relations?: string[]): Promise<IRole | undefined>;
  findByType(type: RoleTypes): Promise<IRole | undefined>;
  save(dataUpdate: IRole): Promise<void>;
  delete(user: IRole): Promise<void>;
  getTotal(): Promise<number>;
}

export { IRolesRepository };
