import { inject, injectable } from 'tsyringe';

import { ICreateSchoolDTO } from '../dtos/ICreateSchoolDTO';
import { ISchoolsRepository } from '../repositories/ISchoolsRepository';

@injectable()
class CreateSchoolService {
  constructor(
    @inject('SchoolsRepository')
    private schoolsRepository: ISchoolsRepository,
  ) {}

  public async execute(data: ICreateSchoolDTO) {
    const School = await this.schoolsRepository.create(data);

    return School;
  }
}

export { CreateSchoolService };
