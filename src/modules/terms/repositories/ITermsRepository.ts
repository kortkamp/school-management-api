import { ICreateTermDTO } from '../dtos/ICreateTermDTO';
import { ITerm } from '../models/ITerm';

interface ITermsRepository {
  create(terms: ICreateTermDTO): Promise<ITerm>;
  getAll(school_id: string): Promise<ITerm[]>;
  findById(userId: string, school_id: string): Promise<ITerm | undefined>;
  findByName(name: string): Promise<ITerm | undefined>;
  save(dataUpdate: ITerm): Promise<void>;
  delete(user: ITerm): Promise<void>;
  getTotal(): Promise<number>;
}

export { ITermsRepository };
