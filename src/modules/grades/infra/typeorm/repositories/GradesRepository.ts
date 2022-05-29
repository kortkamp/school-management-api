import { ICreateGradeDTO } from '@modules/grades/dtos/ICreateGradeDTO';
import { IGradesRepository } from '@modules/grades/repositories/IGradesRepository';
import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm';

import { Grade } from '../models/Grade';

class GradesRepository implements IGradesRepository {
  private ormRepository: Repository<Grade>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Grade>(Grade);
  }

  public async getTotal(): Promise<number> {
    const result = await this.ormRepository.query(
      'SELECT count(grades.id) as total FROM grades ',
    );

    return result[0].total;
  }

  public async create(data: ICreateGradeDTO): Promise<Grade> {
    const newGrade = this.ormRepository.create(data);

    await this.ormRepository.save(newGrade);

    return newGrade;
  }

  public async getAll(relations: string[] = []): Promise<Grade[]> {
    return this.ormRepository.find({ relations });
  }

  public async save(data: Grade): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<Grade | undefined> {
    const grade = await this.ormRepository.findOne({
      where: { id },
      relations,
    });

    return grade;
  }

  public async findByName(name: string): Promise<Grade | undefined> {
    const grade = await this.ormRepository.findOne({
      where: { name },
    });

    return grade;
  }

  public async delete(grade: Grade): Promise<void> {
    await this.ormRepository.remove(grade);
  }
}

export { GradesRepository };
