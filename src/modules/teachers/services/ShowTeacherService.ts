import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

@injectable()
class ShowTeacherService {
  constructor(
    @inject('UsersRepository')
    private teachersRepository: IUsersRepository,
  ) {}
  public async execute(teacherId: string) {
    const teacher = await this.teachersRepository.findById(teacherId, [
      'address',
    ]);
    if (!teacher) {
      throw new ErrorsApp('Teacher does not exists', 404);
    }

    return teacher;
  }
}

export { ShowTeacherService };
