import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { ClassGroupsController } from '../controllers/ClassGroupsController';
import {
  createClassGroupValidate,
  deleteClassGroupValidate,
  showClassGroupValidate,
  updateClassGroupValidate,
} from '../validations/classGroups.validation';

const classGroupsRoutes = Router();

classGroupsRoutes.use(authMiddleware);

const classGroupsController = new ClassGroupsController();

classGroupsRoutes.post(
  '/',
  createClassGroupValidate,
  classGroupsController.create,
);

classGroupsRoutes.get('/', classGroupsController.index);

classGroupsRoutes.delete(
  '/:id',
  deleteClassGroupValidate,
  classGroupsController.delete,
);

classGroupsRoutes.put(
  '/:id',
  updateClassGroupValidate,
  classGroupsController.update,
);

classGroupsRoutes.get(
  '/:id',
  showClassGroupValidate,
  classGroupsController.show,
);

export { classGroupsRoutes };
