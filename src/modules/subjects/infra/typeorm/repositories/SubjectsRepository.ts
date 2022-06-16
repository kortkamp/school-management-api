import { ICreateSubjectDTO } from '@modules/subjects/dtos/ICreateSubjectDTO';
import { ISubjectsRepository } from '@modules/subjects/repositories/ISubjectsRepository';
import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm';

import { Subject } from '../models/Subject';

class SubjectsRepository implements ISubjectsRepository {
  private ormRepository: Repository<Subject>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Subject>(Subject);
  }

  public async getTotal(): Promise<number> {
    const result = await this.ormRepository.query(
      'SELECT count(subjects.id) as total FROM subjects ',
    );

    return result[0].total;
  }

  public async create(data: ICreateSubjectDTO): Promise<Subject> {
    const newSubject = this.ormRepository.create(data);

    await this.ormRepository.save(newSubject);

    return newSubject;
  }

  public async getAll(): Promise<Subject[]> {
    const qb = this.ormRepository.createQueryBuilder('subject');

    qb.select(['subject.id', 'subject.name'])
      .leftJoin('subject.segment', 'segment')
      .addSelect(['segment.id', 'segment.name']);

    return qb.getMany();
  }

  public async save(data: Subject): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<Subject | undefined> {
    const subject = await this.ormRepository.findOne({
      where: { id },
      relations,
    });

    return subject;
  }

  public async findByName(name: string): Promise<Subject | undefined> {
    const subject = await this.ormRepository.findOne({
      where: { name },
    });

    return subject;
  }

  public async delete(subject: Subject): Promise<void> {
    await this.ormRepository.remove(subject);
  }
}

export { SubjectsRepository };
