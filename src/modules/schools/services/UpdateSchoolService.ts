import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSchoolDTO } from '../dtos/ICreateSchoolDTO';
import { ISchoolsRepository } from '../repositories/ISchoolsRepository';

interface IRequest {
  schoolId: string;
  data: Partial<ICreateSchoolDTO>;
}

@injectable()
class UpdateSchoolService {
  constructor(
    @inject('SchoolsRepository')
    private schoolsRepository: ISchoolsRepository,
  ) {}
  public async execute({ schoolId, data }: IRequest) {
    const school = await this.schoolsRepository.findById(schoolId);

    if (!school) {
      throw new ErrorsApp('School not found', 404);
    }

    Object.assign(school, data);

    await this.schoolsRepository.save(school);

    return school;
  }
}

export { UpdateSchoolService };
