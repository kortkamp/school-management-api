import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IGradesRepository } from '../repositories/IGradesRepository';

@injectable()
class ShowGradeService {
  constructor(
    @inject('GradesRepository')
    private gradesRepository: IGradesRepository,
  ) {}
  public async execute(gradeId: string) {
    const grade = await this.gradesRepository.findById(gradeId);
    if (!grade) {
      throw new ErrorsApp('Grade does not exists', 404);
    }

    return grade;
  }
}

export { ShowGradeService };
