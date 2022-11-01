import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IPersonsRepository } from '../repositories/IPersonsRepository';

@injectable()
class FindPersonByCPFService {
  constructor(
    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}
  public async execute(cpf: string) {
    const person = await this.personsRepository.findByCPF(cpf);

    return person;
  }
}

export { FindPersonByCPFService };
