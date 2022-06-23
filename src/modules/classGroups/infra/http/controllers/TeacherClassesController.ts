import { CreateTeacherClassService } from '@modules/classGroups/services/CreateTeacherClassService';
import { DeleteTeacherClassService } from '@modules/classGroups/services/DeleteTeacherClassService';
import { ListTeacherClassesByTeacherService } from '@modules/classGroups/services/ListTeacherClassesByTeacherService';
import { ListTeacherClassesService } from '@modules/classGroups/services/ListTeacherClassesService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseQueryFilters } from 'typeorm-dynamic-filters';

class TeacherClassesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listTeacherClassesService = container.resolve(
      ListTeacherClassesService,
    );

    const filteredModules = await listTeacherClassesService.execute(
      parseQueryFilters(request.query),
    );

    return response.json({
      success: true,
      teacherClasses: instanceToInstance(filteredModules),
    });
  }
  public async listByTeacher(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listTeacherClassesService = container.resolve(
      ListTeacherClassesByTeacherService,
    );

    const filteredModules = await listTeacherClassesService.execute(
      request.params.id,
    );

    return response.json({
      success: true,
      teacherClasses: instanceToInstance(filteredModules),
    });
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const createTeacherClassService = container.resolve(
      CreateTeacherClassService,
    );

    const teacherClass = await createTeacherClassService.execute(request.body);

    return response
      .status(201)
      .json({ success: true, teacherClass: instanceToInstance(teacherClass) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteTeacherClassService = container.resolve(
      DeleteTeacherClassService,
    );

    await deleteTeacherClassService.execute(request.body);

    return response.status(204).json({ success: true });
  }
}

export { TeacherClassesController };
