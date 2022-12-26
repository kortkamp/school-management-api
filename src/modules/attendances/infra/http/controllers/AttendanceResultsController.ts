import { CreateAttendanceResultService } from '@modules/attendances/services/CreateAttendanceResultService';
import { DeleteAttendanceResultService } from '@modules/attendances/services/DeleteAttendanceResultService';
import { ListAttendanceResultsService } from '@modules/attendances/services/ListAttendanceResultsService';
import { ShowAttendanceResultService } from '@modules/attendances/services/ShowAttendanceResultService';
import { UpdateAttendanceResultService } from '@modules/attendances/services/UpdateAttendanceResultService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseQueryFilters } from 'typeorm-dynamic-filters';

class AttendanceResultsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAttendanceResultsService = container.resolve(ListAttendanceResultsService);

    const attendanceResults = await listAttendanceResultsService.execute(
      parseQueryFilters(request.query),
    );

    return response.json({
      success: true,
      attendanceResults: instanceToInstance(attendanceResults),
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createAttendanceResultService = container.resolve(CreateAttendanceResultService);

    const data = request.body;

    const attendanceResult = await createAttendanceResultService.execute({
      auth_user_id: request.user.id,
      data,
    });

    return response
      .status(201)
      .json({ success: true, attendanceResult: instanceToInstance(attendanceResult) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteAttendanceResultService = container.resolve(DeleteAttendanceResultService);

    const attendanceResultId = request.params.id;

    await deleteAttendanceResultService.execute(attendanceResultId);

    return response.status(204).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateAttendanceResultService = container.resolve(UpdateAttendanceResultService);

    const attendanceResultId = request.params.id;

    const data = request.body;

    const attendanceResult = await updateAttendanceResultService.execute({
      attendanceResultId,
      data,
    });

    return response.status(200).json({ success: true, attendanceResult });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showAttendanceResultService = container.resolve(ShowAttendanceResultService);

    const attendanceResultId = request.params.id;

    const attendanceResult = await showAttendanceResultService.execute(attendanceResultId);

    return response.status(200).json({ success: true, attendanceResult });
  }
}

export { AttendanceResultsController };
