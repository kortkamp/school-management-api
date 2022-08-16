import { CreateRoutineGroupService } from '@modules/routines/services/CreateRoutineGroupService';
import { DeleteRoutineGroupService } from '@modules/routines/services/DeleteRoutineGroupService';
import { ListRoutineGroupsService } from '@modules/routines/services/ListRoutineGroupsService';
import { ShowRoutineGroupService } from '@modules/routines/services/ShowRoutineGroupService';
import { UpdateRoutineGroupService } from '@modules/routines/services/UpdateRoutineGroupService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class RoutineGroupsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listRoutineGroupsService = container.resolve(
      ListRoutineGroupsService,
    );

    const school_id = request.school.id;

    const routineGroups = await listRoutineGroupsService.execute(school_id);

    return response.json({
      success: true,
      routineGroups: instanceToInstance(routineGroups),
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createRoutineGroupService = container.resolve(
      CreateRoutineGroupService,
    );

    const school_id = request.school.id;

    const data = request.body;

    const routineGroup = await createRoutineGroupService.execute({
      data,
      school_id,
    });

    return response
      .status(201)
      .json({ success: true, routineGroup: instanceToInstance(routineGroup) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteRoutineGroupService = container.resolve(
      DeleteRoutineGroupService,
    );

    const routineGroupId = request.params.id;

    await deleteRoutineGroupService.execute(routineGroupId);

    return response.status(200).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateRoutineGroupService = container.resolve(
      UpdateRoutineGroupService,
    );

    const routineGroupId = request.params.id;

    const data = request.body;

    const routineGroup = await updateRoutineGroupService.execute({
      routineGroupId,
      data,
    });

    return response.status(200).json({ success: true, routineGroup });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showRoutineGroupService = container.resolve(ShowRoutineGroupService);

    const routineGroupId = request.params.id;

    const routineGroup = await showRoutineGroupService.execute(routineGroupId);

    return response.status(200).json({ success: true, routineGroup });
  }
}

export { RoutineGroupsController };
