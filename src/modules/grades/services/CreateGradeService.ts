import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateGradeDTO } from '../dtos/ICreateGradeDTO';
import { IGradesRepository } from '../repositories/IGradesRepository';

@injectable()
class CreateGradeService {
  constructor(
    @inject('GradesRepository')
    private gradesRepository: IGradesRepository,
  ) {}

  public async execute(data: ICreateGradeDTO) {
    const gradeExists = await this.gradesRepository.findByName(data.name);

    if (gradeExists) {
      throw new ErrorsApp('Grade already exists', 409);
    }

    const grade = await this.gradesRepository.create(data);

    return grade;
  }
}

export { CreateGradeService };
