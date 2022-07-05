import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { RoutinesController } from '../controllers/RoutinesController';
import {
  createRoutineValidate,
  deleteRoutineValidate,
  showRoutineValidate,
  updateRoutineValidate,
} from '../validations/routines.validation';

const routinesRoutes = Router();

routinesRoutes.use(authMiddleware);

const routinesController = new RoutinesController();

routinesRoutes.post(
  '/',
  ensureRoles(['admin']),
  createRoutineValidate,
  routinesController.create,
);

routinesRoutes.get('/', routinesController.index);

routinesRoutes.delete('/:id', deleteRoutineValidate, routinesController.delete);

routinesRoutes.put('/:id', updateRoutineValidate, routinesController.update);

routinesRoutes.get('/:id', showRoutineValidate, routinesController.show);

export { routinesRoutes };
