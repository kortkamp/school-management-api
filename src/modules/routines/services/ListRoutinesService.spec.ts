import 'reflect-metadata';

import { ICreateRoutineDTO } from '../dtos/ICreateRoutineDTO';
import FakeRoutinesRepository from '../repositories/fakes/FakeRoutinesRepository';
import { ListRoutinesService } from './ListRoutinesService';

let fakeRoutinesRepository: FakeRoutinesRepository;

let listRoutinesService: ListRoutinesService;

let routineData: ICreateRoutineDTO;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeRoutinesRepository = new FakeRoutinesRepository();

    listRoutinesService = new ListRoutinesService(fakeRoutinesRepository);

    routineData = {
      name: 'routine1',
    };
  });

  it('Should be able to list routines', async () => {
    const routine1 = await fakeRoutinesRepository.create(routineData);

    const routine2 = await fakeRoutinesRepository.create({
      ...routineData,
      name: 'routine2',
    });

    const routines = await listRoutinesService.execute();

    expect(routines).toEqual([routine1, routine2]);
  });
});
