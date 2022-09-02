import { ISchoolsRepository } from '@modules/schools/repositories/ISchoolsRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ISchoolYearsRepository } from '../repositories/ISchoolYearsRepository';

interface IRequest {
  school_id: string;
  school_year_id: string;
}

@injectable()
class CloseSchoolYearService {
  constructor(
    @inject('SchoolYearsRepository')
    private schoolYearsRepository: ISchoolYearsRepository,

    @inject('SchoolsRepository')
    private schoolsRepository: ISchoolsRepository,
  ) {}

  public async execute({ school_year_id, school_id }: IRequest) {
    const school = await this.schoolsRepository.findById(school_id);

    if (!school) {
      throw new ErrorsApp('Nenhuma escola associada a este usuário', 400);
    }

    if (!school.active_year_id) {
      throw new ErrorsApp(
        'A escola não possui um ano letivo em andamento',
        409,
      );
    }

    const schoolYear = await this.schoolYearsRepository.findById(
      school_year_id,
      school_id,
    );

    if (!schoolYear) {
      throw new ErrorsApp('O ano escolar não existe', 404);
    }

    if (!schoolYear.active) {
      throw new ErrorsApp('O ano escolar informado já foi encerrado', 400);
    }

    // TODO: here we need to make all verifications if the schoolYear can be closed
    //
    //
    //
    //

    schoolYear.active = false;

    await this.schoolYearsRepository.save(schoolYear);

    school.active_year_id = null;

    await this.schoolsRepository.save(school);

    return schoolYear;
  }
}

export { CloseSchoolYearService };
