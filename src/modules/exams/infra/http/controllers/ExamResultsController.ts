import { CreateExamResultService } from '@modules/exams/services/CreateExamResultService';
import { DeleteExamResultService } from '@modules/exams/services/DeleteExamResultService';
import { ListExamResultsService } from '@modules/exams/services/ListExamResultsService';
import { ShowExamResultService } from '@modules/exams/services/ShowExamResultService';
import { UpdateExamResultService } from '@modules/exams/services/UpdateExamResultService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseQueryFilters } from 'typeorm-dynamic-filters';

class ExamResultsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listExamResultsService = container.resolve(ListExamResultsService);

    const examResults = await listExamResultsService.execute(
      parseQueryFilters(request.query),
    );

    return response.json({
      success: true,
      examResults: instanceToInstance(examResults),
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createExamResultService = container.resolve(CreateExamResultService);

    const data = request.body;

    const examResult = await createExamResultService.execute({
      auth_user_id: request.user.id,
      data,
    });

    return response
      .status(201)
      .json({ success: true, examResult: instanceToInstance(examResult) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteExamResultService = container.resolve(DeleteExamResultService);

    const examResultId = request.params.id;

    await deleteExamResultService.execute(examResultId);

    return response.status(204).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateExamResultService = container.resolve(UpdateExamResultService);

    const examResultId = request.params.id;

    const data = request.body;

    const examResult = await updateExamResultService.execute({
      examResultId,
      data,
    });

    return response.status(200).json({ success: true, examResult });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showExamResultService = container.resolve(ShowExamResultService);

    const examResultId = request.params.id;

    const examResult = await showExamResultService.execute(examResultId);

    return response.status(200).json({ success: true, examResult });
  }
}

export { ExamResultsController };
