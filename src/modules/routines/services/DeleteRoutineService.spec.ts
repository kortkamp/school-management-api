import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IRoutine } from '../models/IRoutine';
import FakeRoutinesRepository from '../repositories/fakes/FakeRoutinesRepository';
import { DeleteRoutineService } from './DeleteRoutineService';

let fakeRoutinesRepository: FakeRoutinesRepository;
let deleteRoutineService: DeleteRoutineService;
let routine: IRoutine;

describe('DeleteRoutine', () => {
  const newRoutineData = {
    name: 'routine1',
  };

  beforeEach(async () => {
    fakeRoutinesRepository = new FakeRoutinesRepository();

    deleteRoutineService = new DeleteRoutineService(fakeRoutinesRepository);

    routine = await fakeRoutinesRepository.create(newRoutineData);
  });

  it('should be able to delete a routine', async () => {
    const deleteRoutineResult = await deleteRoutineService.execute(routine.id);

    const routines = await fakeRoutinesRepository.getAll();

    expect(routines).toHaveLength(0);

    expect(deleteRoutineResult).toBeUndefined();
  });

  it('should not be able to delete a routine if it does not exist', async () => {
    await expect(
      deleteRoutineService.execute('user non-existing'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
