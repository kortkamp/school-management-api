import { inject, injectable } from 'tsyringe';

import { ICreateExamDTO } from '../dtos/ICreateExamDTO';
import { IExamResultsRepository } from '../repositories/IExamResultsRepository';
import { IExamsRepository } from '../repositories/IExamsRepository';

@injectable()
class CreateExamService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,

    @inject('ExamResultsRepository')
    private examResultsRepository: IExamResultsRepository,
  ) {}

  public async execute(data: ICreateExamDTO) {
    const exam = await this.examsRepository.create(data);

    return exam;
  }
}

export { CreateExamService };
