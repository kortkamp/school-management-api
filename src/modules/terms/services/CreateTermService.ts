import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTermDTO } from '../dtos/ICreateTermDTO';
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
    const termExists = await this.termsRepository.findByName(data.name);

    if (termExists) {
      throw new ErrorsApp('Este nome já existe', 409);
    }

    if (!school_id) {
      throw new ErrorsApp(
        'O usuário precisa pertencer a uma escola para criar um período do ano',
        403,
      );
    }

    const term = await this.termsRepository.create({
      ...data,
      school_id,
    });

    return term;
  }
}

export { CreateTermService };
