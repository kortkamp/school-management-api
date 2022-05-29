import { ICreateGradeDTO } from '../dtos/ICreateGradeDTO';
import { IGrade } from '../models/IGrade';

interface IGradesRepository {
  create(data: ICreateGradeDTO): Promise<IGrade>;
  getAll(relations?: string[]): Promise<IGrade[]>;
  findById(userId: string, relations?: string[]): Promise<IGrade | undefined>;
  findByName(name: string): Promise<IGrade | undefined>;
  save(dataUpdate: IGrade): Promise<void>;
  delete(user: IGrade): Promise<void>;
  getTotal(): Promise<number>;
}

export { IGradesRepository };
