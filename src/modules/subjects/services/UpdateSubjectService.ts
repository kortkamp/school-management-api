import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSubjectDTO } from '../dtos/ICreateSubjectDTO';
import { ISubjectsRepository } from '../repositories/ISubjectsRepository';

interface IRequest {
  subjectId: string;
  data: Partial<ICreateSubjectDTO>;
}

@injectable()
class UpdateSubjectService {
  constructor(
    @inject('SubjectsRepository')
    private subjectsRepository: ISubjectsRepository,
  ) {}
  public async execute({ subjectId, data }: IRequest) {
    const subject = await this.subjectsRepository.findById(subjectId);

    if (!subject) {
      throw new ErrorsApp('Subject not found', 404);
    }

    if (data.name && data.name !== subject.name) {
      const subjectExists = await this.subjectsRepository.findByName(data.name);

      if (subjectExists) {
        throw new ErrorsApp('Subject name already exists', 409);
      }
    }

    Object.assign(subject, data);

    await this.subjectsRepository.save(subject);

    return subject;
  }
}

export { UpdateSubjectService };
