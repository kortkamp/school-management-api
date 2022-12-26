import { IListAttendancesDTO } from '@modules/attendances/dtos/IListAttendancesDTO';
import { CreateAttendanceService } from '@modules/attendances/services/CreateAttendanceService';
import { DeleteAttendanceService } from '@modules/attendances/services/DeleteAttendanceService';
import { ListAttendancesByTeacherService } from '@modules/attendances/services/ListAttendancesByTeacherService';
import { ListAttendancesService } from '@modules/attendances/services/ListAttendancesService';
import { ListResultsBySubjectService } from '@modules/attendances/services/ListResultsBySubjectService';
import { ShowAttendanceService } from '@modules/attendances/services/ShowAttendanceService';
import { UpdateAttendanceService } from '@modules/attendances/services/UpdateAttendanceService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class AttendancesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAttendancesService = container.resolve(ListAttendancesService);

    const authSchoolId = request.school.id;
    const attendances = await listAttendancesService.execute({
      authSchoolId,
      query: request.query as any as IListAttendancesDTO,
    });

    return response.json({ success: true, ...instanceToInstance(attendances) });
  }

  public async indexByTeacher(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listAttendancesService = container.resolve(ListAttendancesByTeacherService);

    const authUserId = request.user.id;

    const schoolId = request.school.id;
    const attendances = await listAttendancesService.execute({
      authUserId,
      schoolId,
      query: request.query as any as IListAttendancesDTO,
    });

    return response.json({ success: true, ...instanceToInstance(attendances) });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createAttendanceService = container.resolve(CreateAttendanceService);

    const authUserId = request.user.id;

    const schoolId = request.school.id;

    const data = request.body;

    const attendance = await createAttendanceService.execute({
      authUserId,
      schoolId,
      data,
    });

    return response
      .status(201)
      .json({ success: true, attendance: instanceToInstance(attendance) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteAttendanceService = container.resolve(DeleteAttendanceService);

    const attendanceId = request.params.id;

    const authUserId = request.user.id;

    const schoolId = request.school.id;

    await deleteAttendanceService.execute({ attendanceId, authUserId, schoolId });

    return response.status(200).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateAttendanceService = container.resolve(UpdateAttendanceService);

    const attendanceId = request.params.id;

    const data = request.body;

    const authUserId = request.user.id;

    const schoolId = request.school.id;

    const attendance = await updateAttendanceService.execute({
      attendanceId,
      data,
      authUserId,
      schoolId,
    });

    return response.status(200).json({ success: true, attendance });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showAttendanceService = container.resolve(ShowAttendanceService);

    const { user } = request;
    const attendance_id = request.params.id;

    const attendance = await showAttendanceService.execute({ user, attendance_id });

    return response.status(200).json({ success: true, attendance });
  }

  public async listByClassSubject(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listAttendances = container.resolve(ListResultsBySubjectService);

    const { user } = request;
    const subject_id = request.query.subject_id as string;
    const class_id = request.query.class_id as string;

    const attendances = await listAttendances.execute({ user, subject_id, class_id });

    return response.status(200).json({ success: true, attendances });
  }
}

export { AttendancesController };
