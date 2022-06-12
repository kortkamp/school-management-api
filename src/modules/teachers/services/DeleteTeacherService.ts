import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

@injectable()
class DeleteTeacherService {
  constructor(
    @inject('UsersRepository')
    private teachersRepository: IUsersRepository,
  ) {}
  public async execute(teacherId: string) {
    const teacher = await this.teachersRepository.findById(teacherId);
    if (!teacher) {
      throw new ErrorsApp('Teacher does not exists', 404);
    }

    await this.teachersRepository.delete(teacher);
  }
}

export { DeleteTeacherService };
