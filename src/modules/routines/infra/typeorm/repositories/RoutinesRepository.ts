import { ICreateRoutineDTO } from '@modules/routines/dtos/ICreateRoutineDTO';
import { IRoutinesRepository } from '@modules/routines/repositories/IRoutinesRepository';
import { Repository } from 'typeorm';
import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';

import { AppDataSource } from '@shared/infra/typeorm';

import { Routine } from '../models/Routine';

class RoutinesRepository implements IRoutinesRepository {
  private ormRepository: Repository<Routine>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Routine>(Routine);
  }

  public async getTotal(): Promise<number> {
    const total = await this.ormRepository.count();

    return total;
  }

  public async create(data: ICreateRoutineDTO): Promise<Routine> {
    const newRoutine = this.ormRepository.create(data);

    await this.ormRepository.save(newRoutine);

    return newRoutine;
  }

  public async getAll(school_id: string): Promise<Routine[]> {
    return this.ormRepository.find({ where: { school_id } });
  }

  public async save(data: Routine): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<Routine | undefined> {
    const routine = await this.ormRepository.findOne({
      where: { id },
      relations,
    });

    return routine;
  }

  public async delete(routine: Routine): Promise<void> {
    await this.ormRepository.remove(routine);
  }
}

export { RoutinesRepository };
