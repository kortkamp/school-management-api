import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { TeachersController } from '../controllers/TeachersController';
import {
  createTeacherValidate,
  deleteTeacherValidate,
  listTeachersValidate,
  showTeacherValidate,
  updateTeacherValidate,
} from '../validations/teachers.validation';

const teachersRoutes = Router();

teachersRoutes.use(authMiddleware);

const teachersController = new TeachersController();

teachersRoutes.post(
  '/',
  ensureRoles(['admin']),
  createTeacherValidate,
  teachersController.create,
);

teachersRoutes.get('/', listTeachersValidate, teachersController.index);

teachersRoutes.delete(
  '/:id',
  ensureRoles(['admin']),
  deleteTeacherValidate,
  teachersController.delete,
);

teachersRoutes.put(
  '/:id',
  ensureRoles(['admin']),
  updateTeacherValidate,
  teachersController.update,
);

teachersRoutes.get('/:id', showTeacherValidate, teachersController.show);

export { teachersRoutes };
