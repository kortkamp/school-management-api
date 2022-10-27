import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreatePersonDTO } from '../dtos/ICreatePersonDTO';
import { IPerson } from '../models/IPerson';
import FakePersonsRepository from '../repositories/fakes/FakePersonsRepository';
import { UpdatePersonService } from './UpdatePersonService';

let fakePersonsRepository: FakePersonsRepository;

let updatePersonService: UpdatePersonService;

let personData: ICreatePersonDTO;

let person: IPerson;

describe('UpdatePersonService', () => {
  beforeEach(async () => {
    fakePersonsRepository = new FakePersonsRepository();

    updatePersonService = new UpdatePersonService(fakePersonsRepository);

    personData = {
      name: 'User',
    };

    person = await fakePersonsRepository.create(personData);
  });

  it('Should be able to update a person', async () => {
    const updatePersonDate = { name: 'Admin' };

    const updatedPerson = await updatePersonService.execute({
      personId: person.id,
      data: updatePersonDate,
    });

    const storedPerson = await fakePersonsRepository.findById(person.id);

    expect(updatedPerson).toHaveProperty('id');
    expect(updatedPerson).toMatchObject(updatePersonDate);
    expect(updatedPerson?.id).toBe(person.id);
    expect(storedPerson).toMatchObject(updatePersonDate);
  });

  it('Should not be able to update a nonexistent person', async () => {
    const updatePersonDate = { name: 'Admin' };

    await expect(
      updatePersonService.execute({
        personId: 'nonexistent person id',
        data: updatePersonDate,
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able to update a person name to a already existent person name', async () => {
    const anotherPersonData = {
      name: 'guest-user',
    };

    const anotherPerson = await fakePersonsRepository.create(anotherPersonData);

    await expect(
      updatePersonService.execute({
        personId: anotherPerson.id,
        data: { name: personData.name },
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
