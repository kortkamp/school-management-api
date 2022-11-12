import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { ensureRolesOrSelf } from '@modules/roles/infra/http/middlewares/ensureRolesOrSelf';
import { RoleTypes } from '@modules/roles/models/IRole';
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
  '/teacher/',
  ensureRoles([RoleTypes.TEACHER]),
  teacherClassesController.listByTeacher,
);

teacherClassesRoutes.get(
  '/',
  ensureRoles([RoleTypes.PRINCIPAL, RoleTypes.SECRETARY]),
  listTeacherClassesValidate,
  teacherClassesController.index,
);

teacherClassesRoutes.post(
  '/',
  ensureRoles([RoleTypes.PRINCIPAL, RoleTypes.SECRETARY]),
  createTeacherClassValidate,
  teacherClassesController.create,
);

teacherClassesRoutes.delete(
  '/',
  ensureRoles([RoleTypes.PRINCIPAL, RoleTypes.SECRETARY]),
  deleteTeacherClassValidate,
  teacherClassesController.delete,
);

export { teacherClassesRoutes };
