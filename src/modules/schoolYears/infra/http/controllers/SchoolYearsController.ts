import { CreateSchoolYearService } from '@modules/schoolYears/services/CreateSchoolYearService';
import { DeleteSchoolYearService } from '@modules/schoolYears/services/DeleteSchoolYearService';
import { ListSchoolYearsService } from '@modules/schoolYears/services/ListSchoolYearsService';
import { ShowSchoolYearService } from '@modules/schoolYears/services/ShowSchoolYearService';
import { UpdateSchoolYearService } from '@modules/schoolYears/services/UpdateSchoolYearService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SchoolYearsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listSchoolYearsService = container.resolve(ListSchoolYearsService);

    const school_id = request.school.id;

    const schoolYears = await listSchoolYearsService.execute(school_id);

    return response.json({
      success: true,
      schoolYears: instanceToInstance(schoolYears),
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createSchoolYearService = container.resolve(CreateSchoolYearService);
    const school_id = request.school.id;
    const data = request.body;

    const schoolYear = await createSchoolYearService.execute({
      data,
      school_id,
    });

    return response
      .status(201)
      .json({ success: true, schoolYear: instanceToInstance(schoolYear) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteSchoolYearService = container.resolve(DeleteSchoolYearService);

    const schoolYearId = request.params.id;

    const school_id = request.school.id;

    await deleteSchoolYearService.execute(schoolYearId, school_id);

    return response.status(200).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateSchoolYearService = container.resolve(UpdateSchoolYearService);

    const schoolYearId = request.params.id;

    const data = request.body;

    const schoolYear = await updateSchoolYearService.execute({
      schoolYearId,
      data,
    });

    return response.status(200).json({ success: true, schoolYear });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showSchoolYearService = container.resolve(ShowSchoolYearService);

    const schoolYearId = request.params.id;

    const schoolYear = await showSchoolYearService.execute(schoolYearId);

    return response.status(200).json({ success: true, schoolYear });
  }
}

export { SchoolYearsController };
