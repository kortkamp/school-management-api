import { ICreateExamDTO } from '@modules/exams/dtos/ICreateExamDTO';
import { IExamsRepository } from '@modules/exams/repositories/IExamsRepository';
import { Repository } from 'typeorm';
import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';

import { AppDataSource } from '@shared/infra/typeorm';

import { Exam } from '../models/Exam';

class ExamsRepository implements IExamsRepository {
  private ormRepository: Repository<Exam>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Exam>(Exam);
  }

  public async getTotal(): Promise<number> {
    const total = await this.ormRepository.count();

    return total;
  }

  public async create(data: ICreateExamDTO): Promise<Exam> {
    const newExam = this.ormRepository.create(data);

    await this.ormRepository.save(newExam);

    return newExam;
  }

  public async getAll(query: IFilterQuery): Promise<[Exam[], number]> {
    const filterQueryBuilder = new FilterBuilder(this.ormRepository, 'exam');

    const queryBuilder = filterQueryBuilder
      .build(query)
      .leftJoin('exam.subject', 'subject')
      .addSelect(['subject.id', 'subject.name'])
      .leftJoin('exam.class_group', 'class_group')
      .addSelect(['class_group.id', 'class_group.name']);

    const result = await queryBuilder.getManyAndCount();

    return result;
  }

  public async save(data: Exam): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<Exam | undefined> {
    const exam = await this.ormRepository.findOne({
      where: { id },
      relations,
    });

    return exam;
  }

  public async show(id: string): Promise<Exam> {
    const qb = this.ormRepository
      .createQueryBuilder('exam')
      .andWhere({ id })
      .leftJoin('exam.results', 'results')
      .addSelect(['results.id', 'results.value'])
      .leftJoin('results.student', 'student')
      .addSelect(['student.id', 'student.name']);

    return qb.getOne();
  }

  public async delete(exam: Exam): Promise<void> {
    await this.ormRepository.remove(exam);
  }
}

export { ExamsRepository };
