import { inject, injectable } from 'tsyringe';

import { ICreateExamResultDTO } from '../dtos/ICreateExamResultDTO';
import { IExamResultsRepository } from '../repositories/IExamResultsRepository';

@injectable()
class CreateExamResultService {
  constructor(
    @inject('ExamResultsRepository')
    private examResultsRepository: IExamResultsRepository,
  ) {}

  public async execute(data: ICreateExamResultDTO) {
    const examResult = await this.examResultsRepository.create(data);

    return examResult;
  }
}

export { CreateExamResultService };
