import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ISchoolsRepository } from '../repositories/ISchoolsRepository';

@injectable()
class ShowSchoolService {
  constructor(
    @inject('SchoolsRepository')
    private schoolsRepository: ISchoolsRepository,
  ) {}
  public async execute(SchoolId: string) {
    const school = await this.schoolsRepository.findById(SchoolId, ['address']);
    if (!school) {
      throw new ErrorsApp('School does not exists', 404);
    }

    return school;
  }
}

export { ShowSchoolService };
