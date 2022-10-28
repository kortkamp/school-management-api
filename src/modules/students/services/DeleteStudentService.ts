import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IStudentsRepository } from '../repositories/IStudentsRepository';

@injectable()
class DeleteStudentService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
  ) {}
  public async execute(schoolId: string, studentId: string) {
    const student = await this.studentsRepository.findById(schoolId, studentId);
    if (!student) {
      throw new ErrorsApp('Aluno não encontrado', 404);
    }

    await this.studentsRepository.delete(student);
  }
}

export { DeleteStudentService };
