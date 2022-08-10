import { CreateSchoolParameterService } from '@modules/schools/services/CreateSchoolParameterService';
import { ShowSchoolParameterService } from '@modules/schools/services/ShowSchoolParameterService';
import { UpdateSchoolParameterService } from '@modules/schools/services/UpdateSchoolParameterService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SchoolParametersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createSchoolParameterService = container.resolve(
      CreateSchoolParameterService,
    );

    const school_id = request.school.id;

    const schoolParameter = await createSchoolParameterService.execute({
      data: request.body,
      school_id,
    });

    return response.status(201).json({
      success: true,
      schoolParameter: instanceToInstance(schoolParameter),
    });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateSchoolParameterService = container.resolve(
      UpdateSchoolParameterService,
    );

    const schoolParameterId = request.params.id;

    const data = request.body;

    const school_id = request.school.id;

    const schoolParameter = await updateSchoolParameterService.execute({
      schoolParameterId,
      data,
      school_id,
    });

    return response.status(200).json({ success: true, schoolParameter });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showSchoolParameterService = container.resolve(
      ShowSchoolParameterService,
    );

    console.log(request.school);
    const schoolParameterId = request.school.id;

    const schoolParameter = await showSchoolParameterService.execute(
      schoolParameterId,
    );

    return response.status(200).json({ success: true, schoolParameter });
  }
}

export { SchoolParametersController };
