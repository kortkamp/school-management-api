import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateStudentDTO } from '../dtos/ICreateStudentDTO';
import { IStudentsRepository } from '../repositories/IStudentsRepository';

interface IRequest {
  schoolId: string;
  studentId: string;
  data: Partial<ICreateStudentDTO>;
}

@injectable()
class UpdateStudentService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
  ) {}
  public async execute({ schoolId, studentId, data }: IRequest) {
    const student = await this.studentsRepository.findById(schoolId, studentId);

    if (!student) {
      throw new ErrorsApp('Estudante não encontrado', 404);
    }

    Object.assign(student, data);

    await this.studentsRepository.save(student);

    return student;
  }
}

export { UpdateStudentService };
