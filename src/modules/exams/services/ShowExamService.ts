import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IExam } from '../models/IExam';
import { IExamsRepository } from '../repositories/IExamsRepository';

interface IRequest {
  user: {
    id: string;
    role: string;
  };
  exam_id: string;
}

@injectable()
class ShowExamService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
  ) {}
  public async execute({ user, exam_id }: IRequest) {
    let exam: IExam;

    switch (user.role) {
      case 'admin':
        exam = await this.examsRepository.show(exam_id);
        break;
      case 'teacher':
        exam = await this.examsRepository.show(exam_id);
        break;
      case 'student':
        exam = await this.examsRepository.show(exam_id, user.id);
        break;

      default:
        throw new ErrorsApp('Usuário não autorizado a acessar avaliações', 403);
    }

    if (!exam) {
      throw new ErrorsApp('Avaliação não encontrada', 404);
    }

    return exam;
  }
}

export { ShowExamService };
