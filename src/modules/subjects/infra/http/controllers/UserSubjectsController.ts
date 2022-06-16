import { CreateUserSubjectService } from '@modules/subjects/services/CreateUserSubjectService';
import { DeleteUserSubjectService } from '@modules/subjects/services/DeleteUserSubjectService';
import { ListUserSubjectsService } from '@modules/subjects/services/ListUserSubjectsService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UserSubjectsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUserSubjectsService = container.resolve(ListUserSubjectsService);

    const { user_id } = request.params;

    const userSubjects = await listUserSubjectsService.execute(user_id);

    return response.json({
      success: true,
      user_subjects: userSubjects,
    });
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const createUserSubjectService = container.resolve(
      CreateUserSubjectService,
    );

    const subject = await createUserSubjectService.execute(request.body);

    return response
      .status(201)
      .json({ success: true, subject: instanceToInstance(subject) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteUserSubjectService = container.resolve(
      DeleteUserSubjectService,
    );

    const { user_id, subject_id } = request.body;

    await deleteUserSubjectService.execute({ user_id, subject_id });

    return response.status(204).json({ success: true });
  }
}

export { UserSubjectsController };
