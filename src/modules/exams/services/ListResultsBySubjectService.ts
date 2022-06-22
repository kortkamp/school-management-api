import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IExam } from '../models/IExam';
import { IExamsRepository } from '../repositories/IExamsRepository';

interface IRequest {
  user: {
    id: string;
    role: string;
    school_id?: string;
    class_id?: string;
  };
  subject_id: string;
  class_id: string;
}
@injectable()
class ListResultsBySubjectService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
  ) {}
  public async execute({
    user,
    subject_id,
    class_id,
  }: IRequest): Promise<IExam[]> {
    let student_id: string;
    switch (user.role) {
      case 'admin':
        break;
      case 'teacher':
        break;
      case 'student':
        student_id = user.id;
        break;
      default:
        throw new ErrorsApp('Não autorizado a acessar avaliações', 403);
        break;
    }
    const exams = await this.examsRepository.getAllByClassSubject(
      subject_id,
      class_id,
      student_id,
    );

    return exams;
  }
}

export { ListResultsBySubjectService };
