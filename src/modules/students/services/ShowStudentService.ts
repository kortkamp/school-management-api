import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IStudentsRepository } from '../repositories/IStudentsRepository';

@injectable()
class ShowStudentService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
  ) {}
  public async execute(school_id: string, studentId: string) {
    const student = await this.studentsRepository.findById(
      school_id,
      studentId,
    );
    if (!student) {
      throw new ErrorsApp('Aluno não encontrado', 404);
    }
    return student;
  }
}

export { ShowStudentService };
