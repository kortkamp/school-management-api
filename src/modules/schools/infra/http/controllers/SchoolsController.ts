import { CreateSchoolService } from '@modules/schools/services/CreateSchoolService';
import { DeleteSchoolService } from '@modules/schools/services/DeleteSchoolService';
import { ListSchoolsService } from '@modules/schools/services/ListSchoolsService';
import { ShowSchoolService } from '@modules/schools/services/ShowSchoolService';
import { UpdateSchoolService } from '@modules/schools/services/UpdateSchoolService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SchoolsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listSchoolsService = container.resolve(ListSchoolsService);

    const schools = await listSchoolsService.execute();

    return response.json({
      success: true,
      schools: instanceToInstance(schools),
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createSchoolService = container.resolve(CreateSchoolService);

    const school = await createSchoolService.execute(request.body);

    return response
      .status(201)
      .json({ success: true, school: instanceToInstance(school) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteSchoolService = container.resolve(DeleteSchoolService);

    const schoolId = request.params.id;

    await deleteSchoolService.execute(schoolId);

    return response.status(204).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateSchoolService = container.resolve(UpdateSchoolService);

    const schoolId = request.params.id;

    const data = request.body;

    const school = await updateSchoolService.execute({ schoolId, data });

    return response.status(200).json({ success: true, school });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showSchoolService = container.resolve(ShowSchoolService);

    const schoolId = request.params.id;

    const school = await showSchoolService.execute(schoolId);

    return response.status(200).json({ success: true, school });
  }
}

export { SchoolsController };
