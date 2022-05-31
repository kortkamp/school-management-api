import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { FilteredModulesController } from '../controllers/FilteredModulesController';
import {
  createFilteredModuleValidate,
  deleteFilteredModuleValidate,
  listFilteredModulesValidate,
  showFilteredModuleValidate,
  updateFilteredModuleValidate,
} from '../validations/filteredModules.validation';

const filteredModulesRoutes = Router();

filteredModulesRoutes.use(authMiddleware);

const filteredModulesController = new FilteredModulesController();

filteredModulesRoutes.post(
  '/',
  ensureRoles(['teacher']),
  createFilteredModuleValidate,
  filteredModulesController.create,
);

filteredModulesRoutes.get('/', listFilteredModulesValidate, filteredModulesController.index);

filteredModulesRoutes.delete('/:id', deleteFilteredModuleValidate, filteredModulesController.delete);

filteredModulesRoutes.put('/:id', updateFilteredModuleValidate, filteredModulesController.update);

filteredModulesRoutes.get('/:id', showFilteredModuleValidate, filteredModulesController.show);

export { filteredModulesRoutes };
