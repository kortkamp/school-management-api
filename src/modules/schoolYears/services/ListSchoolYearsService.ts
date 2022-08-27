import { inject, injectable } from 'tsyringe';

import { ISchoolYearsRepository } from '../repositories/ISchoolYearsRepository';

@injectable()
class ListSchoolYearsService {
  constructor(
    @inject('SchoolYearsRepository')
    private schoolYearsRepository: ISchoolYearsRepository,
  ) {}
  public async execute(school_id: string) {
    const schoolYears = await this.schoolYearsRepository.getAll(school_id);

    return schoolYears;
  }
}

export { ListSchoolYearsService };
