import { ICreateStudentDTO } from '@modules/students/dtos/ICreateStudentDTO';
import { IListStudentsDTO } from '@modules/students/dtos/IListStudentsDTO';
import { IStudent } from '@modules/students/models/IStudent';
import { IStudentsRepository } from '@modules/students/repositories/IStudentsRepository';
import { Repository } from 'typeorm';

import { customRepository } from '@shared/infra/tenantContext/tenantRepository';
import { AppDataSource } from '@shared/infra/typeorm';

import { Student } from '../models/Student';

class StudentsRepository implements IStudentsRepository {
  private ormRepository: Repository<Student>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Student>(Student).extend(
      customRepository(Student),
    );
  }

  public async findByEnrollId(
    school_id: string,
    enroll_id: string,
  ): Promise<IStudent> {
    return this.ormRepository.findOne({
      where: { enroll_id, school_id },
    });
  }

  public async create(data: ICreateStudentDTO): Promise<Student> {
    const newStudent = this.ormRepository.create(data);

    return this.ormRepository.save(newStudent);
  }

  public async getAll(params: IListStudentsDTO): Promise<[Student[], number]> {
    const { page, per_page, ...where } = params;

    const take = per_page || 10;
    const skip = page ? (page - 1) * per_page : 0;

    return this.ormRepository.findAndCount({
      where,
      take,
      skip,
      relations: ['person', 'course', 'grade', 'classGroup'],
      select: {
        id: true,
        enroll_id: true,
        person: {
          id: true,
          name: true,
          sex: true,
          birth: true,
        },
        course: { id: true, name: true },
        grade: { id: true, name: true },
        classGroup: { id: true, name: true },
      },
    });
  }

  public async save(data: Student): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(
    school_id: string,
    id: string,
    relations?: string[],
  ): Promise<Student | undefined> {
    return this.ormRepository.findOne({
      where: { id, school_id },
      relations,
    });
  }

  public async delete(student: Student): Promise<void> {
    await this.ormRepository.remove(student);
  }
}

export { StudentsRepository };
