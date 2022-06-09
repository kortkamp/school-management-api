import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateStudentDTO } from '../dtos/ICreateStudentDTO';

interface IRequest {
  studentId: string;
  data: Partial<ICreateStudentDTO>;
}

@injectable()
class UpdateStudentService {
  constructor(
    @inject('UsersRepository')
    private studentsRepository: IUsersRepository,
  ) {}
  public async execute({ studentId, data }: IRequest) {
    const student = await this.studentsRepository.findById(studentId);

    if (!student) {
      throw new ErrorsApp('Student not found', 404);
    }

    Object.assign(student, data);

    await this.studentsRepository.save(student);

    return student;
  }
}

export { UpdateStudentService };
