import { ICreateUserSubjectDTO } from '@modules/subjects/dtos/ICreateUserSubjectDTO';
import { IUserSubjectsRepository } from '@modules/subjects/repositories/IUserSubjectsRepository';
import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm';

import { UserSubject } from '../models/UserSubject';

class UserSubjectsRepository implements IUserSubjectsRepository {
  private ormRepository: Repository<UserSubject>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<UserSubject>(UserSubject);
  }

  public async create(data: ICreateUserSubjectDTO): Promise<UserSubject> {
    const newUserSubject = this.ormRepository.create(data);

    await this.ormRepository.save(newUserSubject);

    return newUserSubject;
  }

  public async createMany(
    data: ICreateUserSubjectDTO[],
  ): Promise<UserSubject[]> {
    const newUserSubject = this.ormRepository.create(data);

    await this.ormRepository.save(newUserSubject);

    return newUserSubject;
  }

  public async findByIds(
    data: ICreateUserSubjectDTO,
  ): Promise<UserSubject | undefined> {
    const userSubject = await this.ormRepository.findOne({ where: data });

    return userSubject;
  }

  public async getAll(user_id?: string): Promise<UserSubject[]> {
    const qb = this.ormRepository.createQueryBuilder('userSubject');

    qb.select([
      'userSubject.user_id',
      'userSubject.subject_id',
      'userSubject.type',
    ])
      .where('userSubject.user_id = :user_id', { user_id })
      .leftJoin('userSubject.subject', 'subject')
      .addSelect(['subject.id', 'subject.name'])
      .leftJoin('subject.segment', 'segment')
      .addSelect(['segment.id', 'segment.name']);

    return qb.getMany();
    const userSubjects = await this.ormRepository.find({ where: { user_id } });

    return userSubjects;
  }

  public async delete(userSubject: UserSubject): Promise<void> {
    await this.ormRepository.remove(userSubject);
  }
}

export { UserSubjectsRepository };
