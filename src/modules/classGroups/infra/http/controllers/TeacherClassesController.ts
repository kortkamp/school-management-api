import { CreateTeacherClassService } from '@modules/classGroups/services/CreateTeacherClassService';
import { DeleteTeacherClassService } from '@modules/classGroups/services/DeleteTeacherClassService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class TeacherClassesController {
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
