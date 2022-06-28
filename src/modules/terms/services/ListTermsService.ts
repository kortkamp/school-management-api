import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ITermsRepository } from '../repositories/ITermsRepository';

interface IRequest {
  auth_user: {
    school_id?: string;
  };
}
@injectable()
class ListTermsService {
  constructor(
    @inject('TermsRepository')
    private termsRepository: ITermsRepository,
  ) {}
  public async execute({ auth_user }: IRequest) {
    if (!auth_user.school_id) {
      throw new ErrorsApp(
        'O usuário precisa pertencer a uma escola para criar um período do ano',
        403,
      );
    }
    const terms = await this.termsRepository.getAll(auth_user.school_id);

    return terms;
  }
}

export { ListTermsService };
