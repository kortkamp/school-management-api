import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateRoutineDTO } from '../dtos/ICreateRoutineDTO';
import FakeRoutinesRepository from '../repositories/fakes/FakeRoutinesRepository';
import { CreateRoutineService } from './CreateRoutineService';

let fakeRoutinesRepository: FakeRoutinesRepository;

let createRoutineService: CreateRoutineService;

let routineData: ICreateRoutineDTO;

describe('CreateRoutineService', () => {
  beforeEach(() => {
    fakeRoutinesRepository = new FakeRoutinesRepository();

    createRoutineService = new CreateRoutineService(fakeRoutinesRepository);

    routineData = {
      name: 'User',
    };
  });

  it('Should be able to create a new routine', async () => {
    const routine = await createRoutineService.execute(routineData);

    expect(routine).toHaveProperty('id');
    expect(routine).toHaveProperty('name');

    expect(routine?.name).toBe(routineData.name);
  });

  it('Should not create 2 routines with same name ', async () => {
    await createRoutineService.execute(routineData);

    await expect(createRoutineService.execute(routineData)).rejects.toBeInstanceOf(
      ErrorsApp,
    );
  });
});
