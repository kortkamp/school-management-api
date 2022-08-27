import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ISchoolYearsRepository } from '../repositories/ISchoolYearsRepository';

@injectable()
class ShowSchoolYearService {
  constructor(
    @inject('SchoolYearsRepository')
    private schoolYearsRepository: ISchoolYearsRepository,
  ) {}
  public async execute(schoolYearId: string) {
    const schoolYear = await this.schoolYearsRepository.findById(schoolYearId);
    if (!schoolYear) {
      throw new ErrorsApp('SchoolYear does not exists', 404);
    }

    return schoolYear;
  }
}

export { ShowSchoolYearService };
