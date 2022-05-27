import { ICreateSchoolDTO } from '@modules/schools/dtos/ICreateSchoolDTO';
import { ISchoolsRepository } from '@modules/schools/repositories/ISchoolsRepository';
import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm';

import { School } from '../models/School';

class SchoolsRepository implements ISchoolsRepository {
  private ormRepository: Repository<School>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<School>(School);
  }

  public async getTotal(): Promise<number> {
    const result = await this.ormRepository.query(
      'SELECT count(schools.id) as total FROM Schools ',
    );

    return result[0].total;
  }

  public async create(data: ICreateSchoolDTO): Promise<School> {
    const newSchool = this.ormRepository.create(data);

    await this.ormRepository.save(newSchool);

    return newSchool;
  }

  public async getAll(relations: string[] = []): Promise<School[]> {
    return this.ormRepository.find({ relations });
  }

  public async save(data: School): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<School | undefined> {
    const school = await this.ormRepository.findOne({
      where: { id },
      relations,
    });

    return school;
  }

  public async findByName(name: string): Promise<School | undefined> {
    const school = await this.ormRepository.findOne({
      where: { name },
    });

    return school;
  }

  public async delete(school: School): Promise<void> {
    await this.ormRepository.remove(school);
  }
}

export { SchoolsRepository };
