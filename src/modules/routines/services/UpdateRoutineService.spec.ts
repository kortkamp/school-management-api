import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateRoutineDTO } from '../dtos/ICreateRoutineDTO';
import { IRoutine } from '../models/IRoutine';
import FakeRoutinesRepository from '../repositories/fakes/FakeRoutinesRepository';
import { UpdateRoutineService } from './UpdateRoutineService';

let fakeRoutinesRepository: FakeRoutinesRepository;

let updateRoutineService: UpdateRoutineService;

let routineData: ICreateRoutineDTO;

let routine: IRoutine;

describe('UpdateRoutineService', () => {
  beforeEach(async () => {
    fakeRoutinesRepository = new FakeRoutinesRepository();

    updateRoutineService = new UpdateRoutineService(fakeRoutinesRepository);

    routineData = {
      name: 'User',
    };

    routine = await fakeRoutinesRepository.create(routineData);
  });

  it('Should be able to update a routine', async () => {
    const updateRoutineDate = { name: 'Admin' };

    const updatedRoutine = await updateRoutineService.execute({
      routineId: routine.id,
      data: updateRoutineDate,
    });

    const storedRoutine = await fakeRoutinesRepository.findById(routine.id);

    expect(updatedRoutine).toHaveProperty('id');
    expect(updatedRoutine).toMatchObject(updateRoutineDate);
    expect(updatedRoutine?.id).toBe(routine.id);
    expect(storedRoutine).toMatchObject(updateRoutineDate);
  });

  it('Should not be able to update a nonexistent routine', async () => {
    const updateRoutineDate = { name: 'Admin' };

    await expect(
      updateRoutineService.execute({
        routineId: 'nonexistent routine id',
        data: updateRoutineDate,
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able to update a routine name to a already existent routine name', async () => {
    const anotherRoutineData = {
      name: 'guest-user',
    };

    const anotherRoutine = await fakeRoutinesRepository.create(anotherRoutineData);

    await expect(
      updateRoutineService.execute({
        routineId: anotherRoutine.id,
        data: { name: routineData.name },
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
