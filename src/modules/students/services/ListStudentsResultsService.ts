import { IExamsRepository } from '@modules/exams/repositories/IExamsRepository';
import { IUser } from '@modules/users/models/IUser';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

interface IRequest {
  user: {
    id: string;
    role: string;
    school_id?: string;
    class_id?: string;
  };
  subject_id: string;
  class_group_id: string;
}
@injectable()
class ListStudentsResultsService {
  constructor(
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,

    @inject('UsersRepository')
    private studentsRepository: IUsersRepository,
  ) {}
  public async execute({
    user,
    subject_id,
    class_group_id,
  }: IRequest): Promise<IUser[]> {
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
    const students = await this.studentsRepository.listStudentsResults(
      subject_id,
      class_group_id,
      student_id,
    );

    return students;
  }
}

export { ListStudentsResultsService };
