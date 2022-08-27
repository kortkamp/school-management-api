import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSchoolYearDTO } from '../dtos/ICreateSchoolYearDTO';
import { ISchoolYearsRepository } from '../repositories/ISchoolYearsRepository';

interface IRequest {
  school_id: string;
  data: Omit<ICreateSchoolYearDTO, 'school_id' | 'active'>;
}

@injectable()
class CreateSchoolYearService {
  constructor(
    @inject('SchoolYearsRepository')
    private schoolYearsRepository: ISchoolYearsRepository,
  ) {}

  public async execute({ data, school_id }: IRequest) {
    const schoolYearExists = await this.schoolYearsRepository.findByName(
      data.name,
      school_id,
    );

    if (schoolYearExists) {
      throw new ErrorsApp('O ano escolar já existe', 409);
    }

    const schoolYear = await this.schoolYearsRepository.create({
      ...data,
      school_id,
      active: true,
    });

    return schoolYear;
  }
}

export { CreateSchoolYearService };
