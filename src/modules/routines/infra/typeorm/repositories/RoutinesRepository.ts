import { TeacherClass } from '@modules/classGroups/infra/typeorm/models/TeacherClass';
import { ICreateRoutineDTO } from '@modules/routines/dtos/ICreateRoutineDTO';
import { IRoutinesRepository } from '@modules/routines/repositories/IRoutinesRepository';
import { UserSubject } from '@modules/subjects/infra/typeorm/models/UserSubject';
import { Repository } from 'typeorm';

import { tenantWrapper } from '@shared/infra/tenantContext/tenantRepository';
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
    return this.ormRepository.find({
      where: { routineGroup: { school_id } },
      order: { start_at: 'ASC' },
    });
  }

  public async getAllByClassGroup(
    school_id: string,
    routine_group_id: string,
    class_group_id: string,
  ): Promise<Routine[]> {
    return tenantWrapper(manager => {
      const qb = manager.getRepository(Routine).createQueryBuilder('routine');

      qb.select([
        'routine.id',
        'routine.type',
        'routine.start_at',
        'routine.duration',
      ])
        .leftJoin(
          'routine.routineSubjects',
          'routineSubjects',
          `routineSubjects.class_group_id = '${class_group_id}'`,
        )
        .addSelect(['routineSubjects.week_day'])
        .leftJoin('routineSubjects.subject', 'subject')
        .addSelect(['subject.id', 'subject.name'])
        .leftJoin('routineSubjects.teacher', 'teacher')
        .addSelect(['teacher.id'])
        .leftJoin('teacher.person', 'person')
        .addSelect(['person.id', 'person.name'])
        .where('routine.routine_group_id = :routine_group_id', {
          routine_group_id,
        });

      return qb.getMany();
    });
  }

  public async getAllByTeacher(teacher_id: string): Promise<Routine[]> {
    const qb = this.ormRepository
      .createQueryBuilder('routine')
      .select(['routine.id', 'routine.start_at', 'routine.end_at']);

    qb.leftJoin('routine.routineSubjects', 'routineSubjects').addSelect([
      'routineSubjects.week_day',
    ]);

    qb.leftJoin('routineSubjects.subject', 'subject').addSelect([
      'subject.name',
      'subject.id',
    ]);

    qb.leftJoin('routineSubjects.classGroup', 'classGroup').addSelect([
      'classGroup.name',
      'classGroup.id',
    ]);

    qb.where(qb => {
      const subQuery = qb
        .subQuery()
        .select('teacherClass.class_group_id')
        .from(TeacherClass, 'teacherClass')
        .where('teacherClass.teacher_id = :teacher_id', { teacher_id })
        .getQuery();
      return `routineSubjects.class_group_id IN ${subQuery}`;
    });

    qb.where(qb => {
      const subQuery = qb
        .subQuery()
        .select('userSubject.subject_id')
        .from(UserSubject, 'userSubject')
        .where('userSubject.user_id = :teacher_id', { teacher_id })
        .getQuery();
      return `routineSubjects.subject_id IN ${subQuery}`;
    });

    qb.orderBy('routine.start_at', 'ASC');

    return qb.getMany();
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
