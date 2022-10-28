import { RoleTypes } from '@modules/roles/models/IRole';
import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUser } from '@modules/users/models/IUser';
import { injectable, inject } from 'tsyringe';

import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
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
      person,
    } = data;
    if (!authSchoolId) {
      throw new ErrorsApp(
        'O Usuário precisa pertencer a uma escola para cadastrar um aluno',
        403,
      );
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
      person,
    });

    return student;
  }
}

export { CreateStudentService };
