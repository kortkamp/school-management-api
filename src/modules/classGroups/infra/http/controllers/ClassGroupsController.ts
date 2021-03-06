import { CreateClassGroupService } from '@modules/classGroups/services/CreateClassGroupService';
import { DeleteClassGroupService } from '@modules/classGroups/services/DeleteClassGroupService';
import { ListClassGroupsService } from '@modules/classGroups/services/ListClassGroupsService';
import { ShowClassGroupService } from '@modules/classGroups/services/ShowClassGroupService';
import { UpdateClassGroupService } from '@modules/classGroups/services/UpdateClassGroupService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ClassGroupsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listClassGroupsService = container.resolve(ListClassGroupsService);

    const classGroups = await listClassGroupsService.execute();

    return response.json({
      success: true,
      classGroups: instanceToInstance(classGroups),
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createClassGroupService = container.resolve(CreateClassGroupService);

    const { school_id } = request.user;

    const { name, grade_id } = request.body;

    const classGroup = await createClassGroupService.execute({
      name,
      grade_id,
      school_id,
    });

    return response
      .status(201)
      .json({ success: true, classGroup: instanceToInstance(classGroup) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteClassGroupService = container.resolve(DeleteClassGroupService);

    const classGroupId = request.params.id;

    await deleteClassGroupService.execute(classGroupId);

    return response.status(204).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateClassGroupService = container.resolve(UpdateClassGroupService);

    const classGroupId = request.params.id;

    const data = request.body;

    const classGroup = await updateClassGroupService.execute({
      classGroupId,
      data,
    });

    return response.status(200).json({ success: true, classGroup });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showClassGroupService = container.resolve(ShowClassGroupService);

    const classGroupId = request.params.id;

    const classGroup = await showClassGroupService.execute(classGroupId);

    return response.status(200).json({ success: true, classGroup });
  }
}

export { ClassGroupsController };
