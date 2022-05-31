import { CreateFilteredModuleService } from '@modules/filteredModules/services/CreateFilteredModuleService';
import { DeleteFilteredModuleService } from '@modules/filteredModules/services/DeleteFilteredModuleService';
import { ListFilteredModulesService } from '@modules/filteredModules/services/ListFilteredModulesService';
import { ShowFilteredModuleService } from '@modules/filteredModules/services/ShowFilteredModuleService';
import { UpdateFilteredModuleService } from '@modules/filteredModules/services/UpdateFilteredModuleService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseQueryFilters } from 'typeorm-dynamic-filters';

class FilteredModulesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listFilteredModulesService = container.resolve(ListFilteredModulesService);

    const filteredModules = await listFilteredModulesService.execute(
      parseQueryFilters(request.query),
    );

    return response.json({ success: true, filteredModules: instanceToInstance(filteredModules) });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createFilteredModuleService = container.resolve(CreateFilteredModuleService);

    const teacher_id = request.user.id;

    const data = request.body;

    const filteredModule = await createFilteredModuleService.execute({ teacher_id, ...data });

    return response
      .status(201)
      .json({ success: true, filteredModule: instanceToInstance(filteredModule) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteFilteredModuleService = container.resolve(DeleteFilteredModuleService);

    const filteredModuleId = request.params.id;

    await deleteFilteredModuleService.execute(filteredModuleId);

    return response.status(204).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateFilteredModuleService = container.resolve(UpdateFilteredModuleService);

    const filteredModuleId = request.params.id;

    const data = request.body;

    const filteredModule = await updateFilteredModuleService.execute({ filteredModuleId, data });

    return response.status(200).json({ success: true, filteredModule });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showFilteredModuleService = container.resolve(ShowFilteredModuleService);

    const filteredModuleId = request.params.id;

    const filteredModule = await showFilteredModuleService.execute(filteredModuleId);

    return response.status(200).json({ success: true, filteredModule });
  }
}

export { FilteredModulesController };
