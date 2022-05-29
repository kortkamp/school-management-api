import { CreateGradeService } from '@modules/grades/services/CreateGradeService';
import { DeleteGradeService } from '@modules/grades/services/DeleteGradeService';
import { ListGradesService } from '@modules/grades/services/ListGradesService';
import { ShowGradeService } from '@modules/grades/services/ShowGradeService';
import { UpdateGradeService } from '@modules/grades/services/UpdateGradeService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class GradesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listGradesService = container.resolve(ListGradesService);

    const grades = await listGradesService.execute();

    return response.json({ success: true, grades: instanceToInstance(grades) });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createGradeService = container.resolve(CreateGradeService);

    const grade = await createGradeService.execute(request.body);

    return response
      .status(201)
      .json({ success: true, grade: instanceToInstance(grade) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteGradeService = container.resolve(DeleteGradeService);

    const gradeId = request.params.id;

    await deleteGradeService.execute(gradeId);

    return response.status(204).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateGradeService = container.resolve(UpdateGradeService);

    const gradeId = request.params.id;

    const data = request.body;

    const grade = await updateGradeService.execute({ gradeId, data });

    return response.status(200).json({ success: true, grade });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showGradeService = container.resolve(ShowGradeService);

    const gradeId = request.params.id;

    const grade = await showGradeService.execute(gradeId);

    return response.status(200).json({ success: true, grade });
  }
}

export { GradesController };
