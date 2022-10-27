import { ICreatePersonDTO } from '../dtos/ICreatePersonDTO';
import { IPerson } from '../models/IPerson';

interface IPersonsRepository {
  create(data: ICreatePersonDTO): Promise<IPerson>;
  getAll(relations?: string[]): Promise<IPerson[]>;
  findById(userId: string, relations?: string[]): Promise<IPerson | undefined>;
  findByName(name: string): Promise<IPerson | undefined>;
  save(dataUpdate: IPerson): Promise<void>;
  delete(user: IPerson): Promise<void>;
}

export { IPersonsRepository };
