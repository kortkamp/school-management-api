import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateTermDTO } from '../dtos/ICreateTermDTO';
import { ITermsRepository } from '../repositories/ITermsRepository';

interface IRequest {
  auth_user: { school_id?: string };
  termId: string;
  data: Partial<ICreateTermDTO>;
}

@injectable()
class UpdateTermService {
  constructor(
    @inject('TermsRepository')
    private termsRepository: ITermsRepository,
  ) {}
  public async execute({ termId, data, auth_user }: IRequest) {
    if (!auth_user.school_id) {
      throw new ErrorsApp(
        'O usuário precisa pertencer a uma escola para criar um período do ano',
        403,
      );
    }

    const term = await this.termsRepository.findById(
      termId,
      auth_user.school_id,
    );

    if (!term) {
      throw new ErrorsApp('Term not found', 404);
    }

    if (data.name && data.name !== term.name) {
      const termExists = await this.termsRepository.findByName(data.name);

      if (termExists) {
        throw new ErrorsApp('Term name already exists', 409);
      }
    }

    Object.assign(term, data);

    await this.termsRepository.save(term);

    return term;
  }
}

export { UpdateTermService };
