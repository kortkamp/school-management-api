import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ISubjectsRepository } from '../repositories/ISubjectsRepository';

@injectable()
class DeleteSubjectService {
  constructor(
    @inject('SubjectsRepository')
    private subjectsRepository: ISubjectsRepository,
  ) {}
  public async execute(subjectId: string) {
    const subject = await this.subjectsRepository.findById(subjectId);
    if (!subject) {
      throw new ErrorsApp('Subject does not exists', 404);
    }

    await this.subjectsRepository.delete(subject);
  }
}

export { DeleteSubjectService };
