import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSubjectDTO } from '../dtos/ICreateSubjectDTO';
import { ISubjectsRepository } from '../repositories/ISubjectsRepository';

@injectable()
class CreateSubjectService {
  constructor(
    @inject('SubjectsRepository')
    private subjectsRepository: ISubjectsRepository,
  ) {}

  public async execute(data: ICreateSubjectDTO) {
    const subjectExists = await this.subjectsRepository.findByName(data.name);

    if (subjectExists) {
      throw new ErrorsApp('Subject already exists', 409);
    }

    const subject = await this.subjectsRepository.create(data);

    return subject;
  }
}

export { CreateSubjectService };
