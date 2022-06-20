import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { ensureRolesOrSelf } from '@modules/roles/infra/http/middlewares/ensureRolesOrSelf';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { TeacherClassesController } from '../controllers/TeacherClassesController';
import {
  listTeacherClassesValidate,
  createTeacherClassValidate,
  deleteTeacherClassValidate,
} from '../validations/teacherClasses.validation';

const teacherClassesRoutes = Router();

teacherClassesRoutes.use(authMiddleware);

const teacherClassesController = new TeacherClassesController();

teacherClassesRoutes.get(
  '/teacher/:id',
  ensureRolesOrSelf(['admin']),

  teacherClassesController.listByTeacher,
);

teacherClassesRoutes.get(
  '/',
  ensureRoles(['admin']),
  listTeacherClassesValidate,
  teacherClassesController.index,
);

teacherClassesRoutes.post(
  '/',
  ensureRoles(['admin']),
  createTeacherClassValidate,
  teacherClassesController.create,
);

teacherClassesRoutes.delete(
  '/',
  ensureRoles(['admin']),
  deleteTeacherClassValidate,
  teacherClassesController.delete,
);

export { teacherClassesRoutes };
