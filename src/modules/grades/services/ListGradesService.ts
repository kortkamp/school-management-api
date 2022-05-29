import { inject, injectable } from 'tsyringe';

import { IGradesRepository } from '../repositories/IGradesRepository';

@injectable()
class ListGradesService {
  constructor(
    @inject('GradesRepository')
    private gradesRepository: IGradesRepository,
  ) {}
  public async execute() {
    const grades = await this.gradesRepository.getAll();

    return grades;
  }
}

export { ListGradesService };
