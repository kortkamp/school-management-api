import { ICreateTermDTO } from '@modules/terms/dtos/ICreateTermDTO';
import { ITermsRepository } from '@modules/terms/repositories/ITermsRepository';
import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm';

import { Term } from '../models/Term';

class TermsRepository implements ITermsRepository {
  private ormRepository: Repository<Term>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Term>(Term);
  }

  public async getTotal(): Promise<number> {
    const result = await this.ormRepository.query(
      'SELECT count(terms.id) as total FROM terms ',
    );

    return result[0].total;
  }

  public async create(data: ICreateTermDTO): Promise<Term> {
    const terms = this.ormRepository.create(data);

    await this.ormRepository.save(terms);

    return terms;
  }

  public async getAll(school_year_id: string): Promise<Term[]> {
    return this.ormRepository.find({ where: { school_year_id } });
  }

  public async save(data: Term): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(
    id: string,
    school_year_id: string,
  ): Promise<Term | undefined> {
    const term = await this.ormRepository.findOne({
      where: { id, school_year_id },
    });

    return term;
  }

  public async findByName(name: string): Promise<Term | undefined> {
    const term = await this.ormRepository.findOne({
      where: { name },
    });

    return term;
  }

  public async delete(term: Term): Promise<void> {
    await this.ormRepository.remove(term);
  }
}

export { TermsRepository };
