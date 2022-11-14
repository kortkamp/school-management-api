import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IStudentsRepository } from '../repositories/IStudentsRepository';

interface IRequest {
  schoolId: string;
  authUserId: string;
}

@injectable()
class ShowStudentByAuthUserService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
  ) {}
  public async execute({ authUserId, schoolId }: IRequest) {
    const student = await this.studentsRepository.findByUser(
      schoolId,
      authUserId,
    );
    if (!student) {
      throw new ErrorsApp(
        'Usuário precisa ser aluno para acessar este recurso',
        400,
      );
    }
    return student;
  }
}

export { ShowStudentByAuthUserService };
