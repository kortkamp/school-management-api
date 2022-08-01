import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ITermsRepository } from '../repositories/ITermsRepository';

interface IRequest {
  school_id?: string;
}
@injectable()
class ListTermsService {
  constructor(
    @inject('TermsRepository')
    private termsRepository: ITermsRepository,
  ) {}
  public async execute({ school_id }: IRequest) {
    if (!school_id) {
      throw new ErrorsApp(
        'O usuário precisa pertencer a uma escola para listar os períodos do ano',
        403,
      );
    }
    const terms = await this.termsRepository.getAll(school_id);

    return terms;
  }
}

export { ListTermsService };
