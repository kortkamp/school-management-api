import { CreateStudentPersonService } from '@modules/students/services/CreateStudentPersonService';
import { DeleteStudentService } from '@modules/students/services/DeleteStudentService';
import { ListStudentsService } from '@modules/students/services/ListStudentsService';
import { ShowStudentService } from '@modules/students/services/ShowStudentService';
import { UpdateStudentService } from '@modules/students/services/UpdateStudentService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IListStudentsDTO } from '../../../dtos/IListStudentsDTO';

class StudentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listStudentsService = container.resolve(ListStudentsService);

    const authSchoolId = request.school.id;

    const students = await listStudentsService.execute(
      authSchoolId,
      request.query as any as IListStudentsDTO,
    );

    return response.json({
      success: true,
      ...instanceToInstance(students),
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createStudentService = container.resolve(CreateStudentPersonService);

    const authSchoolId = request.school.id;

    const data = request.body;

    const authUser = request.user;

    const student = await createStudentService.execute({
      data,
      authSchoolId,
      authUser,
    });

    return response
      .status(201)
      .json({ success: true, student: instanceToInstance(student) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteStudentService = container.resolve(DeleteStudentService);

    const studentId = request.params.id;

    const schoolId = request.school.id;

    await deleteStudentService.execute(schoolId, studentId);

    return response.status(204).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateStudentService = container.resolve(UpdateStudentService);

    const studentId = request.params.id;

    const data = request.body;

    const schoolId = request.school.id;

    const student = await updateStudentService.execute({
      schoolId,
      studentId,
      data,
    });

    return response.status(200).json({ success: true, student });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showStudentService = container.resolve(ShowStudentService);

    const studentId = request.params.id;

    const schoolId = request.school.id;

    const student = await showStudentService.execute(schoolId, studentId);

    return response.status(200).json({ success: true, student });
  }
}

export { StudentsController };
