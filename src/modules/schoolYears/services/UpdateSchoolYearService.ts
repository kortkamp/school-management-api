import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSchoolYearDTO } from '../dtos/ICreateSchoolYearDTO';
import { ISchoolYearsRepository } from '../repositories/ISchoolYearsRepository';

interface IRequest {
  school_id: string;
  schoolYearId: string;
  data: Partial<ICreateSchoolYearDTO>;
}

@injectable()
class UpdateSchoolYearService {
  constructor(
    @inject('SchoolYearsRepository')
    private schoolYearsRepository: ISchoolYearsRepository,
  ) {}
  public async execute({ schoolYearId, school_id, data }: IRequest) {
    const schoolYear = await this.schoolYearsRepository.findById(
      schoolYearId,
      school_id,
    );

    if (!schoolYear) {
      throw new ErrorsApp('O ano escolar não existe', 404);
    }

    if (data.name && data.name !== schoolYear.name) {
      const schoolYearExists = await this.schoolYearsRepository.findByName(
        data.name,
        school_id,
      );

      if (schoolYearExists) {
        throw new ErrorsApp('O ano escolar já existe', 409);
      }
    }

    Object.assign(schoolYear, data);

    await this.schoolYearsRepository.save(schoolYear);

    return schoolYear;
  }
}

export { UpdateSchoolYearService };
