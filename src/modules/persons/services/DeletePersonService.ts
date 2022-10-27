import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IPersonsRepository } from '../repositories/IPersonsRepository';

@injectable()
class DeletePersonService {
  constructor(
    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}
  public async execute(personId: string) {
    const person = await this.personsRepository.findById(personId);
    if (!person) {
      throw new ErrorsApp('Person does not exists', 404);
    }

    await this.personsRepository.delete(person);
  }
}

export { DeletePersonService };
