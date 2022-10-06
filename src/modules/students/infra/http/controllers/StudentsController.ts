import { CreateStudentService } from '@modules/students/services/CreateStudentService';
import { DeleteStudentService } from '@modules/students/services/DeleteStudentService';
import { ListStudentsService } from '@modules/students/services/ListStudentsService';
import { ShowStudentService } from '@modules/students/services/ShowStudentService';
import { UpdateStudentService } from '@modules/students/services/UpdateStudentService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseQueryFilters } from 'typeorm-dynamic-filters';

class StudentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listStudentsService = container.resolve(ListStudentsService);

    const school_id = request.school.id;

    const students = await listStudentsService.execute(
      school_id,
      parseQueryFilters(request.query),
    );

    return response.json({
      success: true,
      ...instanceToInstance(students),
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createStudentService = container.resolve(CreateStudentService);

    const school_id = request.school.id;

    const data = request.body;

    const student = await createStudentService.execute({
      data,
      school_id,
    });

    return response
      .status(201)
      .json({ success: true, student: instanceToInstance(student) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteStudentService = container.resolve(DeleteStudentService);

    const studentId = request.params.id;

    await deleteStudentService.execute(studentId);

    return response.status(204).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateStudentService = container.resolve(UpdateStudentService);

    const studentId = request.params.id;

    const data = request.body;

    const student = await updateStudentService.execute({ studentId, data });

    return response.status(200).json({ success: true, student });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showStudentService = container.resolve(ShowStudentService);

    const studentId = request.params.id;

    const student = await showStudentService.execute(studentId);

    return response.status(200).json({ success: true, student });
  }
}

export { StudentsController };
