import { CreateRoutineService } from '@modules/routines/services/CreateRoutineService';
import { DeleteRoutineService } from '@modules/routines/services/DeleteRoutineService';
import { ListRoutinesByUserService } from '@modules/routines/services/ListRoutinesByUserService';
import { ListRoutinesService } from '@modules/routines/services/ListRoutinesService';
import { ShowRoutineService } from '@modules/routines/services/ShowRoutineService';
import { UpdateRoutineService } from '@modules/routines/services/UpdateRoutineService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class RoutinesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listRoutinesService = container.resolve(ListRoutinesService);

    const auth_user = request.user;
    const routines = await listRoutinesService.execute({ auth_user });

    return response.json({
      success: true,
      routines,
    });
  }

  public async indexByUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listRoutinesService = container.resolve(ListRoutinesByUserService);

    const auth_user = request.user;
    const user_id = request.params.id;
    const routines = await listRoutinesService.execute({
      auth_user,
      user_id,
    });

    return response.json({
      success: true,
      routines,
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createRoutineService = container.resolve(CreateRoutineService);

    const data = request.body;

    const routine = await createRoutineService.execute({ data });

    return response.status(201).json({ success: true, routine });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteRoutineService = container.resolve(DeleteRoutineService);

    const routineId = request.params.id;

    await deleteRoutineService.execute(routineId);

    return response.status(200).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateRoutineService = container.resolve(UpdateRoutineService);

    const routineId = request.params.id;

    const data = request.body;

    const routine = await updateRoutineService.execute({ routineId, data });

    return response.status(200).json({ success: true, routine });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showRoutineService = container.resolve(ShowRoutineService);

    const routineId = request.params.id;

    const routine = await showRoutineService.execute(routineId);

    return response.status(200).json({ success: true, routine });
  }
}

export { RoutinesController };
