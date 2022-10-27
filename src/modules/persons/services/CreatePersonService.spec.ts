import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreatePersonDTO } from '../dtos/ICreatePersonDTO';
import FakePersonsRepository from '../repositories/fakes/FakePersonsRepository';
import { CreatePersonService } from './CreatePersonService';

let fakePersonsRepository: FakePersonsRepository;

let createPersonService: CreatePersonService;

let personData: ICreatePersonDTO;

describe('CreatePersonService', () => {
  beforeEach(() => {
    fakePersonsRepository = new FakePersonsRepository();

    createPersonService = new CreatePersonService(fakePersonsRepository);

    personData = {
      name: 'User',
    };
  });

  it('Should be able to create a new person', async () => {
    const person = await createPersonService.execute(personData);

    expect(person).toHaveProperty('id');
    expect(person).toHaveProperty('name');

    expect(person?.name).toBe(personData.name);
  });

  it('Should not create 2 persons with same name ', async () => {
    await createPersonService.execute(personData);

    await expect(createPersonService.execute(personData)).rejects.toBeInstanceOf(
      ErrorsApp,
    );
  });
});
