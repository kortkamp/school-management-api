import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTermDTO } from '../dtos/ICreateTermDTO';
import { ITermsRepository } from '../repositories/ITermsRepository';

interface IRequest {
  data: Omit<ICreateTermDTO, 'school_id'>[];

  school_id: string;
}

@injectable()
class CreateTermService {
  constructor(
    @inject('TermsRepository')
    private termsRepository: ITermsRepository,
  ) {}

  public async execute({ data, school_id }: IRequest) {
    if (!school_id) {
      throw new ErrorsApp(
        'O usuário precisa pertencer a uma escola para criar um período do ano',
        403,
      );
    }

    const terms = await this.termsRepository.create(
      data.map(term => ({ ...term, school_id })),
    );

    return terms;
  }
}

export { CreateTermService };
