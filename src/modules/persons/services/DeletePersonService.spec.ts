import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IPerson } from '../models/IPerson';
import FakePersonsRepository from '../repositories/fakes/FakePersonsRepository';
import { DeletePersonService } from './DeletePersonService';

let fakePersonsRepository: FakePersonsRepository;
let deletePersonService: DeletePersonService;
let person: IPerson;

describe('DeletePerson', () => {
  const newPersonData = {
    name: 'person1',
  };

  beforeEach(async () => {
    fakePersonsRepository = new FakePersonsRepository();

    deletePersonService = new DeletePersonService(fakePersonsRepository);

    person = await fakePersonsRepository.create(newPersonData);
  });

  it('should be able to delete a person', async () => {
    const deletePersonResult = await deletePersonService.execute(person.id);

    const persons = await fakePersonsRepository.getAll();

    expect(persons).toHaveLength(0);

    expect(deletePersonResult).toBeUndefined();
  });

  it('should not be able to delete a person if it does not exist', async () => {
    await expect(
      deletePersonService.execute('user non-existing'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
