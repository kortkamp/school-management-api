import { CreateTermService } from '@modules/terms/services/CreateTermService';
import { DeleteTermService } from '@modules/terms/services/DeleteTermService';
import { ListTermsService } from '@modules/terms/services/ListTermsService';
import { ShowTermService } from '@modules/terms/services/ShowTermService';
import { UpdateTermService } from '@modules/terms/services/UpdateTermService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class TermsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listTermsService = container.resolve(ListTermsService);

    const school_id = request.school.id;

    const terms = await listTermsService.execute({ school_id });

    return response.json({ success: true, terms: instanceToInstance(terms) });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createTermService = container.resolve(CreateTermService);

    const school_id = request.school.id;

    const term = await createTermService.execute({
      data: request.body,
      school_id,
    });

    return response
      .status(201)
      .json({ success: true, term: instanceToInstance(term) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteTermService = container.resolve(DeleteTermService);

    const termId = request.params.id;

    await deleteTermService.execute(termId);

    return response.status(204).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateTermService = container.resolve(UpdateTermService);

    const termId = request.params.id;

    const data = request.body;

    const school_id = request.school.id;

    const term = await updateTermService.execute({ termId, data, school_id });

    return response.status(200).json({ success: true, term });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showTermService = container.resolve(ShowTermService);

    const termId = request.params.id;

    const term = await showTermService.execute(termId);

    return response.status(200).json({ success: true, term });
  }
}

export { TermsController };
