import 'reflect-metadata';

import { ICreatePersonDTO } from '../dtos/ICreatePersonDTO';
import FakePersonsRepository from '../repositories/fakes/FakePersonsRepository';
import { ListPersonsService } from './ListPersonsService';

let fakePersonsRepository: FakePersonsRepository;

let listPersonsService: ListPersonsService;

let personData: ICreatePersonDTO;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakePersonsRepository = new FakePersonsRepository();

    listPersonsService = new ListPersonsService(fakePersonsRepository);

    personData = {
      name: 'person1',
    };
  });

  it('Should be able to list persons', async () => {
    const person1 = await fakePersonsRepository.create(personData);

    const person2 = await fakePersonsRepository.create({
      ...personData,
      name: 'person2',
    });

    const persons = await listPersonsService.execute();

    expect(persons).toEqual([person1, person2]);
  });
});
