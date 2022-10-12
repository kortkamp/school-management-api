import { ICreateTenantDTO } from '../dtos/ICreateTenantDTO';
import { ITenant } from '../models/ITenant';

interface ITenantsRepository {
  create(data: ICreateTenantDTO): Promise<ITenant>;
  getAll(relations?: string[]): Promise<ITenant[]>;
  findById(userId: string, relations?: string[]): Promise<ITenant | undefined>;
  save(dataUpdate: ITenant): Promise<void>;
  delete(user: ITenant): Promise<void>;
}

export { ITenantsRepository };
