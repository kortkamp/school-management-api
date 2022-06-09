import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

@injectable()
class DeleteStudentService {
  constructor(
    @inject('UsersRepository')
    private studentsRepository: IUsersRepository,
  ) {}
  public async execute(studentId: string) {
    const student = await this.studentsRepository.findById(studentId);
    if (!student) {
      throw new ErrorsApp('Student does not exists', 404);
    }

    await this.studentsRepository.delete(student);
  }
}

export { DeleteStudentService };
