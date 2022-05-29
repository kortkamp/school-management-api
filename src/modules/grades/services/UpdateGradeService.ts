import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateGradeDTO } from '../dtos/ICreateGradeDTO';
import { IGradesRepository } from '../repositories/IGradesRepository';

interface IRequest {
  gradeId: string;
  data: Partial<ICreateGradeDTO>;
}

@injectable()
class UpdateGradeService {
  constructor(
    @inject('GradesRepository')
    private gradesRepository: IGradesRepository,
  ) {}
  public async execute({ gradeId, data }: IRequest) {
    const grade = await this.gradesRepository.findById(gradeId);

    if (!grade) {
      throw new ErrorsApp('Grade not found', 404);
    }

    if (data.name && data.name !== grade.name) {
      const gradeExists = await this.gradesRepository.findByName(data.name);

      if (gradeExists) {
        throw new ErrorsApp('Grade name already exists', 409);
      }
    }

    Object.assign(grade, data);

    await this.gradesRepository.save(grade);

    return grade;
  }
}

export { UpdateGradeService };
