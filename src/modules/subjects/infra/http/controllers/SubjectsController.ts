import { CreateSubjectService } from '@modules/subjects/services/CreateSubjectService';
import { DeleteSubjectService } from '@modules/subjects/services/DeleteSubjectService';
import { ListSubjectsService } from '@modules/subjects/services/ListSubjectsService';
import { ShowSubjectService } from '@modules/subjects/services/ShowSubjectService';
import { UpdateSubjectService } from '@modules/subjects/services/UpdateSubjectService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SubjectsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listSubjectsService = container.resolve(ListSubjectsService);
    const { user } = request;
    const subjects = await listSubjectsService.execute({ user });

    return response.json({
      success: true,
      subjects: instanceToInstance(subjects),
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createSubjectService = container.resolve(CreateSubjectService);

    const subject = await createSubjectService.execute(request.body);

    return response
      .status(201)
      .json({ success: true, subject: instanceToInstance(subject) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteSubjectService = container.resolve(DeleteSubjectService);

    const subjectId = request.params.id;

    await deleteSubjectService.execute(subjectId);

    return response.status(204).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateSubjectService = container.resolve(UpdateSubjectService);

    const subjectId = request.params.id;

    const data = request.body;

    const subject = await updateSubjectService.execute({ subjectId, data });

    return response.status(200).json({ success: true, subject });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showSubjectService = container.resolve(ShowSubjectService);

    const subjectId = request.params.id;

    const subject = await showSubjectService.execute(subjectId);

    return response.status(200).json({ success: true, subject });
  }
}

export { SubjectsController };
