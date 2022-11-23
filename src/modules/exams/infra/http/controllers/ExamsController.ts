import { IListExamsDTO } from '@modules/exams/dtos/IListExamsDTO';
import { CreateExamService } from '@modules/exams/services/CreateExamService';
import { DeleteExamService } from '@modules/exams/services/DeleteExamService';
import { ListExamsByTeacherService } from '@modules/exams/services/ListExamsByTeacherService';
import { ListExamsService } from '@modules/exams/services/ListExamsService';
import { ListResultsBySubjectService } from '@modules/exams/services/ListResultsBySubjectService';
import { ShowExamService } from '@modules/exams/services/ShowExamService';
import { UpdateExamService } from '@modules/exams/services/UpdateExamService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ExamsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listExamsService = container.resolve(ListExamsService);

    const authSchoolId = request.school.id;
    const exams = await listExamsService.execute({
      authSchoolId,
      query: request.query as any as IListExamsDTO,
    });

    return response.json({ success: true, ...instanceToInstance(exams) });
  }

  public async indexByTeacher(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listExamsService = container.resolve(ListExamsByTeacherService);

    const authUserId = request.user.id;

    const schoolId = request.school.id;
    const exams = await listExamsService.execute({
      authUserId,
      schoolId,
      query: request.query as any as IListExamsDTO,
    });

    return response.json({ success: true, ...instanceToInstance(exams) });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createExamService = container.resolve(CreateExamService);

    const authUserId = request.user.id;

    const schoolId = request.school.id;

    const data = request.body;

    const exam = await createExamService.execute({
      authUserId,
      schoolId,
      data,
    });

    return response
      .status(201)
      .json({ success: true, exam: instanceToInstance(exam) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteExamService = container.resolve(DeleteExamService);

    const examId = request.params.id;

    const authUserId = request.user.id;

    const schoolId = request.school.id;

    await deleteExamService.execute({ examId, authUserId, schoolId });

    return response.status(200).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateExamService = container.resolve(UpdateExamService);

    const examId = request.params.id;

    const data = request.body;

    const authUserId = request.user.id;

    const schoolId = request.school.id;

    const exam = await updateExamService.execute({
      examId,
      data,
      authUserId,
      schoolId,
    });

    return response.status(200).json({ success: true, exam });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showExamService = container.resolve(ShowExamService);

    const { user } = request;
    const exam_id = request.params.id;

    const exam = await showExamService.execute({ user, exam_id });

    return response.status(200).json({ success: true, exam });
  }

  public async listByClassSubject(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listExams = container.resolve(ListResultsBySubjectService);

    const { user } = request;
    const subject_id = request.query.subject_id as string;
    const class_id = request.query.class_id as string;

    const exams = await listExams.execute({ user, subject_id, class_id });

    return response.status(200).json({ success: true, exams });
  }
}

export { ExamsController };
