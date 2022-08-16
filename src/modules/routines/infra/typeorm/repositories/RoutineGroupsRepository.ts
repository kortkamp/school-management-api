import { ICreateRoutineGroupDTO } from '@modules/routines/dtos/ICreateRoutineGroupDTO';
import { IRoutineGroupsRepository } from '@modules/routines/repositories/IRoutineGroupsRepository';
import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm';

import { RoutineGroup } from '../models/RoutineGroup';

class RoutineGroupsRepository implements IRoutineGroupsRepository {
  private ormRepository: Repository<RoutineGroup>;

  constructor() {
    this.ormRepository =
      AppDataSource.getRepository<RoutineGroup>(RoutineGroup);
  }

  public async create(data: ICreateRoutineGroupDTO): Promise<RoutineGroup> {
    const newRoutineGroup = this.ormRepository.create(data);

    await this.ormRepository.save(newRoutineGroup);

    return newRoutineGroup;
  }

  public async getAll(school_id: string): Promise<RoutineGroup[]> {
    return this.ormRepository.find({ where: { school_id } });
  }

  public async save(data: RoutineGroup): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(id: string): Promise<RoutineGroup | undefined> {
    const routineGroup = await this.ormRepository.findOne({
      where: { id },
    });

    return routineGroup;
  }

  public async delete(routineGroup: RoutineGroup): Promise<void> {
    await this.ormRepository.remove(routineGroup);
  }
}

export { RoutineGroupsRepository };
