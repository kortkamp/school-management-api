import { ISchoolsRepository } from '@modules/schools/repositories/ISchoolsRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ISchoolYearsRepository } from '../repositories/ISchoolYearsRepository';

interface IRequest {
  schoolId: string;
}

@injectable()
class ShowCurrentSchoolYearService {
  constructor(
    @inject('SchoolYearsRepository')
    private schoolYearsRepository: ISchoolYearsRepository,

    @inject('SchoolsRepository')
    private schoolsRepository: ISchoolsRepository,
  ) {}
  public async execute({ schoolId }: IRequest) {
    const school = await this.schoolsRepository.findById(schoolId);

    if (!school) {
      throw new ErrorsApp('A instituição informada não existe', 404);
    }

    if (!school.active_year_id) {
      throw new ErrorsApp(
        'A instituição não possui Ano Escolar em andamento',
        404,
      );
    }

    const schoolYear = await this.schoolYearsRepository.findById(
      school.active_year_id,
      schoolId,
      ['terms'],
    );

    if (!schoolYear) {
      throw new ErrorsApp('O Ano escolar não existe', 500);
    }

    return schoolYear;
  }
}

export { ShowCurrentSchoolYearService };
