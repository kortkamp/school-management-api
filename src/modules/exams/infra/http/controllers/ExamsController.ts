import { CreateExamService } from '@modules/exams/services/CreateExamService';
import { DeleteExamService } from '@modules/exams/services/DeleteExamService';
import { ListExamsService } from '@modules/exams/services/ListExamsService';
import { ShowExamService } from '@modules/exams/services/ShowExamService';
import { UpdateExamService } from '@modules/exams/services/UpdateExamService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseQueryFilters } from 'typeorm-dynamic-filters';

class ExamsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listExamsService = container.resolve(ListExamsService);
    const { user, query } = request;
    const exams = await listExamsService.execute({
      user,
      query: parseQueryFilters(query),
    });

    return response.json({ success: true, exams: instanceToInstance(exams) });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createExamService = container.resolve(CreateExamService);

    const teacher_id = request.user.id;

    const data = request.body;

    const exam = await createExamService.execute({ teacher_id, ...data });

    return response
      .status(201)
      .json({ success: true, exam: instanceToInstance(exam) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteExamService = container.resolve(DeleteExamService);

    const examId = request.params.id;

    await deleteExamService.execute(examId);

    return response.status(204).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateExamService = container.resolve(UpdateExamService);

    const examId = request.params.id;

    const data = request.body;

    const exam = await updateExamService.execute({ examId, data });

    return response.status(200).json({ success: true, exam });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showExamService = container.resolve(ShowExamService);

    const { user } = request;
    const exam_id = request.params.id;

    const exam = await showExamService.execute({ user, exam_id });

    return response.status(200).json({ success: true, exam });
  }
}

export { ExamsController };
