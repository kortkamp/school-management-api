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

    const school_id = request.school.id;

    const classGroups = await listClassGroupsService.execute(school_id);

    return response.json({
      success: true,
      classGroups: instanceToInstance(classGroups),
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createClassGroupService = container.resolve(CreateClassGroupService);

    const authSchoolId = request.school.id;

    const data = request.body;

    const classGroup = await createClassGroupService.execute({
      authSchoolId,
      data,
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

    const schoolId = request.school.id;

    const data = request.body;

    const classGroup = await updateClassGroupService.execute({
      schoolId,
      classGroupId,
      data,
    });

    return response.status(200).json({ success: true, classGroup });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showClassGroupService = container.resolve(ShowClassGroupService);

    const classGroupId = request.params.id;

    const school_id = request.school.id;

    const classGroup = await showClassGroupService.execute(
      classGroupId,
      school_id,
    );

    return response.status(200).json({ success: true, classGroup });
  }
}

export { ClassGroupsController };
