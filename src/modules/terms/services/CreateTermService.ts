import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTermDTO } from '../dtos/ICreateTermDTO';
import { ITermsRepository } from '../repositories/ITermsRepository';

interface IRequest {
  data: Omit<ICreateTermDTO, 'school_id'>;
  auth_user: {
    school_id?: string;
  };
}

@injectable()
class CreateTermService {
  constructor(
    @inject('TermsRepository')
    private termsRepository: ITermsRepository,
  ) {}

  public async execute({ data, auth_user }: IRequest) {
    const termExists = await this.termsRepository.findByName(data.name);

    if (termExists) {
      throw new ErrorsApp('O período do ano já existe', 409);
    }

    if (!auth_user.school_id) {
      throw new ErrorsApp(
        'O usuário precisa pertencer a uma escola para criar um período do ano',
        403,
      );
    }

    const term = await this.termsRepository.create({
      ...data,
      school_id: auth_user.school_id,
    });

    return term;
  }
}

export { CreateTermService };
