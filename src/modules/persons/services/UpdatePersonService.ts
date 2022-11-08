import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreatePersonDTO } from '../dtos/ICreatePersonDTO';
import { IPersonsRepository } from '../repositories/IPersonsRepository';

interface IRequest {
  personId: string;
  data: Partial<ICreatePersonDTO>;
}

@injectable()
class UpdatePersonService {
  constructor(
    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}
  public async execute({ personId, data }: IRequest) {
    const person = await this.personsRepository.findById(personId);

    if (!person) {
      throw new ErrorsApp('Person not found', 404);
    }

    if (data.name && data.name !== person.name) {
      const personExists = await this.personsRepository.findByName(data.name);

      if (personExists) {
        throw new ErrorsApp('Person name already exists', 409);
      }
    }

    if (!data.addresses[0].id) {
      // eslint-disable-next-line no-param-reassign
      data.addresses[0].id = uuid();
    }
    Object.assign(person, data);

    await this.personsRepository.save(person);

    return person;
  }
}

export { UpdatePersonService };
