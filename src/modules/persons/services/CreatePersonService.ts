import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreatePersonDTO } from '../dtos/ICreatePersonDTO';
import { IPersonsRepository } from '../repositories/IPersonsRepository';

@injectable()
class CreatePersonService {
  constructor(
    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute(data: ICreatePersonDTO) {
    const personExists = await this.personsRepository.findByName(data.name);

    if (personExists) {
      throw new ErrorsApp('Person already exists', 409);
    }

    const person = await this.personsRepository.create(data);

    return person;
  }
}

export { CreatePersonService };
