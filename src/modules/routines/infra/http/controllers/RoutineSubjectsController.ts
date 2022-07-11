import { CreateRoutineSubjectService } from '@modules/routines/services/CreateRoutineSubjectService';
import { ListRoutinesByClassGroup } from '@modules/routines/services/ListRoutinesByClassGroup';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class RoutineSubjectsController {
  public async indexByClassGroup(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listRoutines = container.resolve(ListRoutinesByClassGroup);

    const class_group_id = request.params.id;

    const routineSubjects = await listRoutines.execute({
      class_group_id,
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
      request.body.routine_subjects,
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
