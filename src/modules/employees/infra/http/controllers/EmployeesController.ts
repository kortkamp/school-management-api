import { CreateEmployeeRoleService } from '@modules/employees/services/CreateEmployeeRoleService';
import { CreateEmployeeService } from '@modules/employees/services/CreateEmployeeService';
import { DeleteEmployeeService } from '@modules/employees/services/DeleteEmployeeService';
import { ListEmployeesService } from '@modules/employees/services/ListEmployeesService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseQueryFilters } from 'typeorm-dynamic-filters';

class EmployeesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listEmployeesService = container.resolve(ListEmployeesService);
    const school_id = request.school.id;

    const employees = await listEmployeesService.execute({
      school_id,
      query: parseQueryFilters(request.query),
    });

    return response.json({
      success: true,
      ...instanceToInstance(employees),
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createEmployeeService = container.resolve(CreateEmployeeService);

    const data = request.body;

    const school_id = request.school.id;

    const employee = await createEmployeeService.execute({ school_id, data });

    return response
      .status(201)
      .json({ success: true, employee: instanceToInstance(employee) });
  }

  public async createRole(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createEmployeeRoleService = container.resolve(
      CreateEmployeeRoleService,
    );

    const data = request.body;

    const school_id = request.school.id;

    const authUserId = request.user.id;

    const employee = await createEmployeeRoleService.execute({
      authUserId,
      school_id,
      data,
    });

    return response
      .status(201)
      .json({ success: true, employee: instanceToInstance(employee) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteEmployeeService = container.resolve(DeleteEmployeeService);

    const { user_id, role_id } = request.body;

    const school_id = request.school.id;

    await deleteEmployeeService.execute({ user_id, role_id, school_id });

    return response.status(200).json({ success: true });
  }
}

export { EmployeesController };
