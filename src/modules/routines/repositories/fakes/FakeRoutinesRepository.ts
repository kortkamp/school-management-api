import { ICreateRoutineDTO } from '@modules/routines/dtos/ICreateRoutineDTO';
import { FakeRoutine } from '@modules/routines/models/fakes/FakeRoutine';
import { IRoutine } from '@modules/routines/models/IRoutine';
import { IRoutinesRepository } from '@modules/routines/repositories/IRoutinesRepository';

class FakeRoutinesRepository implements IRoutinesRepository {
  private routines: IRoutine[] = [];

  public async findById(user_id: string): Promise<IRoutine | undefined> {
    const findUser = this.routines.find(user => user.id === user_id);

    return findUser;
  }

  public async findByName(email: string): Promise<IRoutine | undefined> {
    const routine = this.routines.find(user => user.name === email);

    return routine;
  }

  public async create(data: ICreateRoutineDTO): Promise<IRoutine> {
    const routine = new FakeRoutine(data);
    this.routines.push(routine);
    return routine;
  }

  public async update(routine: IRoutine): Promise<IRoutine> {
    this.routines = this.routines.map(oldRoutine =>
      oldRoutine.id !== routine.id ? oldRoutine : routine,
    );

    return routine;
  }

  public async getAll(): Promise<IRoutine[]> {
    return this.routines;
  }

  public async getTotal(): Promise<number> {
    return this.routines.length;
  }

  public async save(data: IRoutine): Promise<void> {
    const searchUser = this.routines.findIndex(user => user.id === data.id);

    if (searchUser >= 0) {
      Object.assign(this.routines[searchUser], data);
    }
  }

  public async delete(user: IRoutine): Promise<void> {
    const listWithRemovedUsers = this.routines.filter(item => item.id !== user.id);
    this.routines = listWithRemovedUsers;
  }
}

export default FakeRoutinesRepository;
