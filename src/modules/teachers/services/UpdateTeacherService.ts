import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTeacherDTO } from '../dtos/ICreateTeacherDTO';

interface IRequest {
  teacherId: string;
  data: Partial<ICreateTeacherDTO>;
}

@injectable()
class UpdateTeacherService {
  constructor(
    @inject('UsersRepository')
    private teachersRepository: IUsersRepository,
  ) {}
  public async execute({ teacherId, data }: IRequest) {
    const teacher = await this.teachersRepository.findById(teacherId);

    if (!teacher) {
      throw new ErrorsApp('Teacher not found', 404);
    }

    Object.assign(teacher, data);

    await this.teachersRepository.save(teacher);

    return teacher;
  }
}

export { UpdateTeacherService };
