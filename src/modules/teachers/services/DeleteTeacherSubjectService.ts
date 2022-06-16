import { ICreateUserSubjectDTO } from '@modules/subjects/dtos/ICreateUserSubjectDTO';
import { IUserSubjectsRepository } from '@modules/subjects/repositories/IUserSubjectsRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

interface IRequest {
  teacher_id: string;
  subject_id: string;
}
@injectable()
class DeleteTeacherSubjectService {
  constructor(
    @inject('UserSubjectsRepository')
    private userSubjectsRepository: IUserSubjectsRepository,
  ) {}

  public async execute({ teacher_id, subject_id }: IRequest) {
    const userSubjectExists = await this.userSubjectsRepository.findByIds({
      user_id: teacher_id,
      subject_id,
    });

    if (!userSubjectExists) {
      throw new ErrorsApp('Relation not found', 404);
    }

    await this.userSubjectsRepository.delete(userSubjectExists);
  }
}

export { DeleteTeacherSubjectService };
