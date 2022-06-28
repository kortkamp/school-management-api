import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ITermsRepository } from '../repositories/ITermsRepository';

@injectable()
class DeleteTermService {
  constructor(
    @inject('TermsRepository')
    private termsRepository: ITermsRepository,
  ) {}
  public async execute(termId: string) {
    const term = await this.termsRepository.findById(termId);
    if (!term) {
      throw new ErrorsApp('Term does not exists', 404);
    }

    await this.termsRepository.delete(term);
  }
}

export { DeleteTermService };
