import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ITeachersRepository } from '../repositories/ITeachersRepository';

@injectable()
class DeleteTeacherService {
  constructor(
    @inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,
  ) {}
  public async execute(school_id: string, teacherId: string) {
    const teacher = await this.teachersRepository.findById(
      school_id,
      teacherId,
    );
    if (!teacher) {
      throw new ErrorsApp('O Professor não existe', 404);
    }

    await this.teachersRepository.delete(teacher);
  }
}

export { DeleteTeacherService };
