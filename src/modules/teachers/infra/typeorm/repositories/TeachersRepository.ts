import { ICreateTeacherDTO } from '@modules/teachers/dtos/ICreateTeacherDTO';
import { IListTeachersDTO } from '@modules/teachers/dtos/IListTeachersDTO';
import { ITeachersRepository } from '@modules/teachers/repositories/ITeachersRepository';
import { Repository } from 'typeorm';

import {
  customRepository,
  tenantWrapper,
} from '@shared/infra/tenantContext/tenantRepository';
import { AppDataSource } from '@shared/infra/typeorm';

import { Teacher } from '../models/Teacher';

class TeachersRepository implements ITeachersRepository {
  private ormRepository: Repository<Teacher>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Teacher>(Teacher).extend(
      customRepository(Teacher),
    );
  }

  public async create(data: ICreateTeacherDTO): Promise<Teacher> {
    const newTeacher = this.ormRepository.create(data);

    return this.ormRepository.save(newTeacher);
  }

  public async getAll(params: IListTeachersDTO): Promise<[Teacher[], number]> {
    const { page, per_page, ...where } = params;

    const take = per_page || 10;
    const skip = page ? (page - 1) * per_page : 0;

    return this.ormRepository.findAndCount({
      where,
      take,
      skip,
      relations: ['person'],
      select: {
        id: true,
        active: true,
        person: {
          id: true,
          name: true,
          sex: true,
          birth: true,
        },
      },
    });
  }

  public async save(data: Teacher): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(
    school_id: string,
    id: string,
    relations?: string[],
  ): Promise<Teacher | undefined> {
    return this.ormRepository.findOne({
      where: { id, school_id },
      relations,
    });
  }

  public async findByPerson(
    school_id: string,
    person_id: string,
  ): Promise<Teacher | undefined> {
    return this.ormRepository.findOne({
      where: { person_id, school_id },
    });
  }

  public async findByPersonTenant(
    school_id: string,
    person_id: string,
    tenant_id?: string,
  ): Promise<Teacher | undefined> {
    return tenantWrapper(async manager => {
      const qb = manager.getRepository(Teacher).createQueryBuilder('teacher');
      qb.where(
        'teacher.person_id = :person_id AND teacher.school_id = :school_id',
        {
          person_id,
          school_id,
        },
      );
      return qb.getOne();
    }, tenant_id);
  }

  public async findByUser(
    school_id: string,
    user_id: string,
  ): Promise<Teacher | undefined> {
    return this.ormRepository.findOne({
      relations: ['person', 'person.user'],
      where: {
        person: {
          user: {
            id: user_id,
          },
        },
        school_id,
      },
    });
  }

  public async delete(student: Teacher): Promise<void> {
    await this.ormRepository.remove(student);
  }
}

export { TeachersRepository };
