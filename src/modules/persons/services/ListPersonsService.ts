import { inject, injectable } from 'tsyringe';

import { IPersonsRepository } from '../repositories/IPersonsRepository';

@injectable()
class ListPersonsService {
  constructor(
    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}
  public async execute() {
    const persons = await this.personsRepository.getAll();

    return persons;
  }
}

export { ListPersonsService };
