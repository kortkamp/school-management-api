import { ICreateExamResultDTO } from '@modules/exams/dtos/ICreateExamResultDTO';
import { IExamResultsRepository } from '@modules/exams/repositories/IExamResultsRepository';
import { Repository } from 'typeorm';
import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';

import { AppDataSource } from '@shared/infra/typeorm';

import { ExamResult } from '../models/ExamResult';

class ExamResultsRepository implements IExamResultsRepository {
  private ormRepository: Repository<ExamResult>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<ExamResult>(ExamResult);
  }

  public async getTotal(): Promise<number> {
    const total = await this.ormRepository.count();

    return total;
  }

  public async create(data: ICreateExamResultDTO): Promise<ExamResult> {
    const newExamResult = this.ormRepository.create(data);

    await this.ormRepository.save(newExamResult);

    return newExamResult;
  }

  public async getAll(query: IFilterQuery): Promise<[ExamResult[], number]> {
    const filterQueryBuilder = new FilterBuilder(this.ormRepository, 'user');

    const queryBuilder = filterQueryBuilder.build(query);

    const result = await queryBuilder.getManyAndCount();

    return result;
  }

  public async save(data: ExamResult): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<ExamResult | undefined> {
    const examResult = await this.ormRepository.findOne({
      where: { id },
      relations,
    });

    return examResult;
  }

  public async delete(examResult: ExamResult): Promise<void> {
    await this.ormRepository.remove(examResult);
  }
}

export { ExamResultsRepository };
