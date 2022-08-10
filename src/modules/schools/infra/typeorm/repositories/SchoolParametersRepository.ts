import { ICreateSchoolParameterDTO } from '@modules/schools/dtos/ICreateSchoolParameterDTO';
import { ISchoolParametersRepository } from '@modules/schools/repositories/ISchoolParametersRepository';
import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm';

import { SchoolParameter } from '../models/SchoolParameter';

class SchoolParametersRepository implements ISchoolParametersRepository {
  private ormRepository: Repository<SchoolParameter>;

  constructor() {
    this.ormRepository =
      AppDataSource.getRepository<SchoolParameter>(SchoolParameter);
  }

  public async create(
    data: ICreateSchoolParameterDTO,
  ): Promise<SchoolParameter> {
    const schoolParameters = this.ormRepository.create(data);

    await this.ormRepository.save(schoolParameters);

    return schoolParameters;
  }

  public async save(data: SchoolParameter): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findBySchoolId(
    school_id: string,
  ): Promise<SchoolParameter | undefined> {
    const schoolParameter = await this.ormRepository.findOne({
      where: { school_id },
    });

    return schoolParameter;
  }
}

export { SchoolParametersRepository };
