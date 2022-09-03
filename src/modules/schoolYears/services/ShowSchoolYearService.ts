import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ISchoolYearsRepository } from '../repositories/ISchoolYearsRepository';

interface IRequest {
  schoolYearId: string;
  schoolId: string;
}

@injectable()
class ShowSchoolYearService {
  constructor(
    @inject('SchoolYearsRepository')
    private schoolYearsRepository: ISchoolYearsRepository,
  ) {}
  public async execute({ schoolId, schoolYearId }: IRequest) {
    const schoolYear = await this.schoolYearsRepository.findById(
      schoolYearId,
      schoolId,
      ['terms'],
    );
    if (!schoolYear) {
      throw new ErrorsApp('SchoolYear does not exists', 404);
    }

    return schoolYear;
  }
}

export { ShowSchoolYearService };
