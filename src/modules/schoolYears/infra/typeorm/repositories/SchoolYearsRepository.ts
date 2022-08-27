import { ICreateSchoolYearDTO } from '@modules/schoolYears/dtos/ICreateSchoolYearDTO';
import { ISchoolYear } from '@modules/schoolYears/models/ISchoolYear';
import { ISchoolYearsRepository } from '@modules/schoolYears/repositories/ISchoolYearsRepository';
import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm';

import { SchoolYear } from '../models/SchoolYear';

class SchoolYearsRepository implements ISchoolYearsRepository {
  private ormRepository: Repository<SchoolYear>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<SchoolYear>(SchoolYear);
  }

  public async create(data: ICreateSchoolYearDTO): Promise<SchoolYear> {
    const newSchoolYear = this.ormRepository.create(data);

    await this.ormRepository.save(newSchoolYear);

    return newSchoolYear;
  }

  public async getAll(school_id: string): Promise<SchoolYear[]> {
    return this.ormRepository.find({ where: { school_id } });
  }

  public async save(data: SchoolYear): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findByName(
    name: string,
    school_id: string,
  ): Promise<ISchoolYear | undefined> {
    const schoolYear = await this.ormRepository.findOne({
      where: { name, school_id },
    });

    return schoolYear;
  }

  public async findById(
    id: string,
    school_id: string,
    relations?: string[],
  ): Promise<SchoolYear | undefined> {
    const schoolYear = await this.ormRepository.findOne({
      where: { id, school_id },
      relations,
    });

    return schoolYear;
  }

  public async delete(schoolYear: SchoolYear): Promise<void> {
    await this.ormRepository.remove(schoolYear);
  }
}

export { SchoolYearsRepository };
