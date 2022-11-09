import { ICreateExamDTO } from '@modules/exams/dtos/ICreateExamDTO';
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

  public async getAll(query: IFilterQuery): Promise<[Exam[], number]> {
    const exams = tenantWrapper(manager => {
      const qb = manager.getRepository(Exam).createQueryBuilder('exam');
      qb.leftJoin('exam.subject', 'subject')
        .addSelect(['subject.id', 'subject.name'])
        .leftJoin('exam.class_group', 'class_group')
        .addSelect(['class_group.id', 'class_group.name'])
        .leftJoin('exam.teacher', 'teacher')
        .leftJoin('teacher.person', 'person')
        .addSelect(['teacher.id', 'person.id', 'person.name'])
        .leftJoin('exam.term', 'term')
        .addSelect(['term.id', 'term.name']);

      const result = qb.getManyAndCount();

      return result;
    });

    return exams;
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
    await this.ormRepository.save(data);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<Exam | undefined> {
    const exam = await this.ormRepository.findOne({
      where: { id },
      relations,
    });

    return exam;
  }

  public async show(id: string, student_id?: string): Promise<Exam> {
    const qb = this.ormRepository
      .createQueryBuilder('exam')
      .andWhere({ id })
      .leftJoin('exam.subject', 'subject')
      .addSelect(['subject.id', 'subject.name'])
      .leftJoin('exam.class_group', 'class_group')
      .addSelect(['class_group.id', 'class_group.name'])
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

    return qb.getOne();
  }

  public async delete(exam: Exam): Promise<void> {
    await this.ormRepository.remove(exam);
  }
}

export { ExamsRepository };
