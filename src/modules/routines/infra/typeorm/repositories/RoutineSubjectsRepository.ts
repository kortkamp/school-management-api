import { ICreateRoutineSubjectDTO } from '@modules/routines/dtos/ICreateRoutineSubjectDTO';
import { IRoutineSubject } from '@modules/routines/models/IRoutineSubject';
import { IRoutineSubjectsRepository } from '@modules/routines/repositories/IRoutineSubjectsRepository';
import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm';

import { RoutineSubject } from '../models/RoutineSubject';

class RoutineSubjectsRepository implements IRoutineSubjectsRepository {
  private ormRepository: Repository<RoutineSubject>;

  constructor() {
    this.ormRepository =
      AppDataSource.getRepository<RoutineSubject>(RoutineSubject);
  }

  public async getAllByClassGroup(
    class_group_id: string,
  ): Promise<IRoutineSubject[]> {
    return this.ormRepository.find({
      where: { class_group_id },
      select: ['class_group_id', 'routine_id', 'subject_id', 'week_day'],
    });
  }

  public async getAllByTeacher(teacher_id: string): Promise<IRoutineSubject[]> {
    const qb = this.ormRepository.createQueryBuilder('routine_subject');

    return this.ormRepository.find();
  }

  public async create(
    data: ICreateRoutineSubjectDTO[],
  ): Promise<RoutineSubject[]> {
    const newRoutineSubject = this.ormRepository.create(data);

    await this.ormRepository.save(newRoutineSubject);

    return newRoutineSubject;
  }

  public async save(data: RoutineSubject): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async delete(routineSubject: RoutineSubject): Promise<void> {
    await this.ormRepository.remove(routineSubject);
  }
}

export { RoutineSubjectsRepository };
