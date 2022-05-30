import { CreateUserSubjectService } from '@modules/subjects/services/CreateUserSubjectService';
import { DeleteUserSubjectService } from '@modules/subjects/services/DeleteUserSubjectService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UserSubjectsController {
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
