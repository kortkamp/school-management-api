import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { RolesController } from '../controllers/RolesController';
import { ensureRoles } from '../middlewares/ensureRoles';
import {
  createRoleValidate,
  deleteRoleValidate,
  showRoleValidate,
  updateRoleValidate,
} from '../validations/roles.validation';

const rolesRoutes = Router();

const rolesController = new RolesController();

rolesRoutes.use(authMiddleware);

rolesRoutes.get('/', rolesController.index);

rolesRoutes.get('/:id', showRoleValidate, rolesController.show);

// rolesRoutes.use(ensureRoles(['super-admin']));

rolesRoutes.post('/', createRoleValidate, rolesController.create);

rolesRoutes.delete('/:id', deleteRoleValidate, rolesController.delete);

rolesRoutes.put('/:id', updateRoleValidate, rolesController.update);

export { rolesRoutes };
