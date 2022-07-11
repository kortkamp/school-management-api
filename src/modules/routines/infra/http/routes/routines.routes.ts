import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { ensureRolesOrSelf } from '@modules/roles/infra/http/middlewares/ensureRolesOrSelf';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { RoutinesController } from '../controllers/RoutinesController';
import {
  createRoutineValidate,
  deleteRoutineValidate,
  showRoutineValidate,
  updateRoutineValidate,
} from '../validations/routines.validation';
import { routineSubjectsRoutes } from './routineSubjects.routes';

const routinesRoutes = Router();

routinesRoutes.use(authMiddleware);

const routinesController = new RoutinesController();

routinesRoutes.use('/subjects', routineSubjectsRoutes);

routinesRoutes.post(
  '/',
  ensureRoles(['admin']),
  createRoutineValidate,
  routinesController.create,
);

routinesRoutes.get('/', routinesController.index);

routinesRoutes.get(
  '/teacher/:id',
  ensureRolesOrSelf(['admin']),
  routinesController.indexByUser,
);

routinesRoutes.delete('/:id', deleteRoutineValidate, routinesController.delete);

routinesRoutes.put('/:id', updateRoutineValidate, routinesController.update);

routinesRoutes.get('/:id', showRoutineValidate, routinesController.show);

export { routinesRoutes };
