import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ISchoolsRepository } from '../repositories/ISchoolsRepository';

@injectable()
class DeleteSchoolService {
  constructor(
    @inject('SchoolsRepository')
    private SchoolsRepository: ISchoolsRepository,
  ) {}
  public async execute(schoolId: string) {
    const school = await this.SchoolsRepository.findById(schoolId);
    if (!school) {
      throw new ErrorsApp('School does not exists', 404);
    }

    await this.SchoolsRepository.delete(school);
  }
}

export { DeleteSchoolService };
