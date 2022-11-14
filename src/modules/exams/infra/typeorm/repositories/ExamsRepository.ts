import { ICreateExamDTO } from '@modules/exams/dtos/ICreateExamDTO';
import { IListExamsDTO } from '@modules/exams/dtos/IListExamsDTO';
import { IExamsRepository } from '@modules/exams/repositories/IExamsRepository';
import { Repository } from 'typeorm';
import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';

import {
  customRepository,
  tenantWrapper,
} from '@shared/infra/tenantContext/tenantRepository';
import { AppDataSource } from '@shared/infra/typeorm';

import { Exam } from '../models/Exam';

class ExamsRepository implements IExamsRepository {
  private ormRepository: Repository<Exam>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Exam>(Exam).extend(
      customRepository(Exam),
    );
  }

  public async getTotal(): Promise<number> {
    const total = await this.ormRepository.count();

    return total;
  }

  public async create(data: ICreateExamDTO): Promise<Exam> {
    const newExam = this.ormRepository.create(data);

    await this.ormRepository.save(newExam);

    return newExam;
  }

  public async getAll(query: IListExamsDTO): Promise<[Exam[], number]> {
    const { page, per_page, ...where } = query;

    const take = per_page || 10;
    const skip = page ? (page - 1) * per_page : 0;

    return this.ormRepository.findAndCount({
      where,
      take,
      skip,
      relations: [
        'subject',
        'class_group',
        'teacher',
        'teacher.person',
        'term',
      ],
      select: {
        id: true,
        type: true,
        status: true,
        value: true,
        date: true,
        created_at: true,
        subject: {
          id: true,
          name: true,
        },
        class_group: {
          id: true,
          name: true,
        },
        teacher: {
          id: true,
          person: {
            id: true,
            name: true,
          },
        },
        term: {
          id: true,
          name: true,
        },
      },
      order: { created_at: 'DESC' },
    });
  }

  public async getAllByClassSubject(
    subject_id: string,
    class_id: string,
    student_id?: string,
  ): Promise<Exam[]> {
    const qb = this.ormRepository.createQueryBuilder('exam');

    qb.andWhere({ subject_id, class_id })
      .select([
        'exam.id',
        'exam.type',
        'exam.status',
        'exam.value',
        'exam.weight',
        'exam.date',
        'exam.subject_id',
      ])
      .leftJoin('exam.subject', 'subject')
      .addSelect(['subject.id', 'subject.name'])
      .leftJoin('exam.class_group', 'class_group')
      .addSelect(['class_group.id', 'class_group.name'])
      .leftJoin('exam.teacher', 'teacher')
      .addSelect(['teacher.id', 'teacher.name'])

      .leftJoin(
        'exam.results',
        'results',
        student_id ? 'results.student_id = :student_id' : '',
        {
          student_id,
        },
      )

      .addSelect(['results.value'])
      .leftJoin('results.student', 'student')
      .addSelect(['student.id', 'student.name']);

    // if (student_id) {
    //   qb.andWhere('student.id = :student_id or student.id is null ', {
    //     student_id,
    //   });
    // }

    const result = await qb.getMany();

    return result;
  }

  public async save(data: Exam): Promise<void> {
    console.log(data);
    await this.ormRepository.save(data);
  }

  public async findById(
    exam_id: string,
    school_id: string,
    teacher_id: string,
  ): Promise<Exam | undefined> {
    const exam = await this.ormRepository.findOne({
      where: { id: exam_id, school_id, teacher_id },
    });

    return exam;
  }

  public async show(id: string, student_id?: string): Promise<Exam> {
    const exam = await this.ormRepository.findOne({
      where: { id },
      relations: [
        'class_group',
        'class_group.students',
        'class_group.students.person',
        'results',
      ],
      select: {
        id: true,
        type: true,
        status: true,
        weight: true,
        date: true,
        class_group: {
          id: true,
          name: true,
          students: {
            id: true,
            person: {
              id: true,
              name: true,
            },
          },
        },
      },
    });
    return exam;
  }

  public async delete(exam: Exam): Promise<void> {
    await this.ormRepository.remove(exam);
  }
}

export { ExamsRepository };
