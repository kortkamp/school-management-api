import { CreateTeacherService } from '@modules/teachers/services/CreateTeacherService';
import { DeleteTeacherService } from '@modules/teachers/services/DeleteTeacherService';
import { ListTeachersService } from '@modules/teachers/services/ListTeachersService';
import { ShowTeacherService } from '@modules/teachers/services/ShowTeacherService';
import { UpdateTeacherService } from '@modules/teachers/services/UpdateTeacherService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseQueryFilters } from 'typeorm-dynamic-filters';

class TeachersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listTeachersService = container.resolve(ListTeachersService);
    const school_id = request.school.id;

    const teachers = await listTeachersService.execute({
      school_id,
      query: parseQueryFilters(request.query),
    });

    return response.json({
      success: true,
      ...instanceToInstance(teachers),
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createTeacherService = container.resolve(CreateTeacherService);

    const data = request.body;

    const school_id = request.school.id;

    const teacher = await createTeacherService.execute({ school_id, data });

    return response
      .status(201)
      .json({ success: true, teacher: instanceToInstance(teacher) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteTeacherService = container.resolve(DeleteTeacherService);

    const teacherId = request.params.id;

    await deleteTeacherService.execute(teacherId);

    return response.status(204).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateTeacherService = container.resolve(UpdateTeacherService);

    const teacherId = request.params.id;

    const data = request.body;

    const teacher = await updateTeacherService.execute({ teacherId, data });

    return response.status(200).json({ success: true, teacher });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showTeacherService = container.resolve(ShowTeacherService);

    const teacherId = request.params.id;

    const teacher = await showTeacherService.execute(teacherId);

    return response.status(200).json({ success: true, teacher });
  }
}

export { TeachersController };
