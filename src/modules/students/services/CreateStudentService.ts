import { IPersonsRepository } from '@modules/persons/repositories/IPersonsRepository';
import { injectable, inject } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateStudentDTO } from '../dtos/ICreateStudentDTO';
import { IStudentsRepository } from '../repositories/IStudentsRepository';

interface IRequest {
  authSchoolId: string;
  data: ICreateStudentDTO;
}

@injectable()
class CreateStudentService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,
  ) {}

  public async execute({ authSchoolId, data }: IRequest) {
    const {
      active = true,
      enroll_date = new Date().toISOString().split('T')[0],
      school_id = authSchoolId,
      person_id,
      class_group_id,
      course_id,
      enroll_id,
      grade_id,
    } = data;
    if (!authSchoolId) {
      throw new ErrorsApp(
        'O Usuário precisa pertencer a uma escola para cadastrar um aluno',
        403,
      );
    }

    const personExists = await this.personsRepository.findById(person_id);

    if (!personExists) {
      throw new ErrorsApp('A pessoa não existe', 404);
    }

    if (data.enroll_id) {
      const enrollExists = await this.studentsRepository.findByEnrollId(
        authSchoolId,
        data.enroll_id,
      );

      if (enrollExists) {
        throw new ErrorsApp('A matrícula já está cadastrada', 409);
      }
    }

    const student = await this.studentsRepository.create({
      active,
      enroll_date,
      school_id,
      person_id,
      class_group_id,
      course_id,
      enroll_id,
      grade_id,
    });

    return student;
  }
}

export { CreateStudentService };
