import { inject, injectable } from 'tsyringe';

import { ISchoolsRepository } from '../repositories/ISchoolsRepository';

@injectable()
class ListSchoolsService {
  constructor(
    @inject('SchoolsRepository')
    private schoolsRepository: ISchoolsRepository,
  ) {}
  public async execute() {
    const schools = await this.schoolsRepository.getAll();

    return schools;
  }
}

export { ListSchoolsService };
