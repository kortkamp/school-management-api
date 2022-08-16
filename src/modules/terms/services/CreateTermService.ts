import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTermDTO } from '../dtos/ICreateTermDTO';
import { TermType } from '../models/ITerm';
import { ITermsRepository } from '../repositories/ITermsRepository';

interface IRequest {
  data: Omit<ICreateTermDTO, 'school_id'>;

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

    const { name = '', type = TermType.STANDARD } = data;

    const terms = await this.termsRepository.create({ name, type, school_id });

    return terms;
  }
}

export { CreateTermService };
