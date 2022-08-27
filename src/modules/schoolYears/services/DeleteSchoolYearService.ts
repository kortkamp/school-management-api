import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ISchoolYearsRepository } from '../repositories/ISchoolYearsRepository';

@injectable()
class DeleteSchoolYearService {
  constructor(
    @inject('SchoolYearsRepository')
    private schoolYearsRepository: ISchoolYearsRepository,
  ) {}
  public async execute(schoolYearId: string, school_id: string) {
    const schoolYear = await this.schoolYearsRepository.findById(
      schoolYearId,
      school_id,
    );
    if (!schoolYear) {
      throw new ErrorsApp('O ano escolar não existe', 404);
    }

    await this.schoolYearsRepository.delete(schoolYear);
  }
}

export { DeleteSchoolYearService };
