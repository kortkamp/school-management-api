import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { RoleTypes } from '@modules/roles/models/IRole';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { EmployeesController } from '../controllers/EmployeesController';
import {
  createEmployeeRoleValidate,
  createEmployeeValidate,
  deleteEmployeeValidate,
  listEmployeesValidate,
  showEmployeeValidate,
  updateEmployeeValidate,
} from '../validations/employees.validation';

const employeesRoutes = Router();

employeesRoutes.use(authMiddleware);

employeesRoutes.use(
  ensureRoles([
    RoleTypes.REGISTER,
    RoleTypes.ADMIN,
    RoleTypes.PRINCIPAL,
    RoleTypes.SECRETARY,
  ]),
);

const employeesController = new EmployeesController();

employeesRoutes.post(
  '/roles/',
  createEmployeeRoleValidate,
  employeesController.createRole,
);

employeesRoutes.post('/', createEmployeeValidate, employeesController.create);

employeesRoutes.get('/', listEmployeesValidate, employeesController.index);

employeesRoutes.delete(
  '/:id',
  deleteEmployeeValidate,
  employeesController.delete,
);

employeesRoutes.put('/:id', updateEmployeeValidate, employeesController.update);

employeesRoutes.get('/:id', showEmployeeValidate, employeesController.show);

export { employeesRoutes };
