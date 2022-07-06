import { CreateRoutineSubjectService } from '@modules/routines/services/CreateRoutineSubjectService';
import { ListRoutinesByTeacherService } from '@modules/routines/services/ListRoutinesByTeacherService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class RoutineSubjectsController {
  public async indexByTeacher(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listRoutines = container.resolve(ListRoutinesByTeacherService);

    const auth_user = request.user;

    const routineSubjects = await listRoutines.execute({
      teacher_id: auth_user.id,
    });

    return response.json({
      success: true,
      routineSubjects,
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createRoutineSubjectService = container.resolve(
      CreateRoutineSubjectService,
    );

    const routineSubject = await createRoutineSubjectService.execute(
      request.body.routineSubjects,
    );

    return response.status(201).json({
      success: true,
      routineSubject: instanceToInstance(routineSubject),
    });
  }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const deleteRoutineSubjectService = container.resolve(
  //     DeleteRoutineSubjectService,
  //   );

  //   const routineSubjectId = request.params.id;

  //   await deleteRoutineSubjectService.execute(routineSubjectId);

  //   return response.status(204).json({ success: true });
  // }
}

export { RoutineSubjectsController };
