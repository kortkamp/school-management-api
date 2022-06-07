import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { examStatus } from '../models/IExam';
import { IExamResultsRepository } from '../repositories/IExamResultsRepository';
import { IExamsRepository } from '../repositories/IExamsRepository';

interface IExamResult {
  student_id: string;
  value: number;
}

interface IRequest {
  exam_id: string;
  results: IExamResult[];
}

@injectable()
class CreateExamResultService {
  constructor(
    @inject('ExamResultsRepository')
    private examResultsRepository: IExamResultsRepository,

    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
  ) {}

  public async execute(data: IRequest) {
    const exam = await this.examsRepository.findById(data.exam_id);

    if (!exam) {
      throw new ErrorsApp('Exam not found', 404);
    }

    const createResultsData = data.results.map(result => {
      return {
        exam_id: data.exam_id,
        student_id: result.student_id,
        value: result.value,
      };
    });

    const examResult = await this.examResultsRepository.createMany(
      createResultsData,
    );

    exam.status = examStatus.CLOSED;

    await this.examsRepository.save(exam);

    return examResult;
  }
}

export { CreateExamResultService };
