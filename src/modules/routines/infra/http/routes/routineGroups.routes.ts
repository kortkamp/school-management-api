import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { RoutineGroupsController } from '../controllers/RoutineGroupsController';
import {
  createRoutineGroupValidate,
  deleteRoutineGroupValidate,
  showRoutineGroupValidate,
  updateRoutineGroupValidate,
} from '../validations/routineGroups.validation';

const routineGroupsRoutes = Router();

routineGroupsRoutes.use(authMiddleware);

const routineGroupsController = new RoutineGroupsController();

routineGroupsRoutes.post(
  '/',
  createRoutineGroupValidate,
  routineGroupsController.create,
);

routineGroupsRoutes.get('/', routineGroupsController.index);

routineGroupsRoutes.delete(
  '/:id',
  deleteRoutineGroupValidate,
  routineGroupsController.delete,
);

routineGroupsRoutes.put(
  '/:id',
  updateRoutineGroupValidate,
  routineGroupsController.update,
);

routineGroupsRoutes.get(
  '/:id',
  showRoutineGroupValidate,
  routineGroupsController.show,
);

export { routineGroupsRoutes };
