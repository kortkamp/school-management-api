import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IExamResultsRepository } from '../repositories/IExamResultsRepository';

@injectable()
class ShowExamResultService {
  constructor(
    @inject('ExamResultsRepository')
    private examResultsRepository: IExamResultsRepository,
  ) {}
  public async execute(examResultId: string) {
    const examResult = await this.examResultsRepository.findById(examResultId);
    if (!examResult) {
      throw new ErrorsApp('ExamResult does not exists', 404);
    }

    return examResult;
  }
}

export { ShowExamResultService };
