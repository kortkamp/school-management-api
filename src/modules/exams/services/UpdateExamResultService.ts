import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateExamResultDTO } from '../dtos/ICreateExamResultDTO';
import { IExamResultsRepository } from '../repositories/IExamResultsRepository';

interface IRequest {
  examResultId: string;
  data: Partial<ICreateExamResultDTO>;
}

@injectable()
class UpdateExamResultService {
  constructor(
    @inject('ExamResultsRepository')
    private examResultsRepository: IExamResultsRepository,
  ) {}
  public async execute({ examResultId, data }: IRequest) {
    const examResult = await this.examResultsRepository.findById(examResultId);

    if (!examResult) {
      throw new ErrorsApp('ExamResult not found', 404);
    }

    Object.assign(examResult, data);

    await this.examResultsRepository.save(examResult);

    return examResult;
  }
}

export { UpdateExamResultService };
