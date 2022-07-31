import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { RoleTypes } from '@modules/roles/models/IRole';
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
import { teacherSubjectsRoutes } from './teacherSubjects.routes';

const teachersRoutes = Router();

teachersRoutes.use(authMiddleware);

teachersRoutes.use('/subjects', teacherSubjectsRoutes);

teachersRoutes.use(
  ensureRoles([RoleTypes.ADMIN, RoleTypes.PRINCIPAL, RoleTypes.SECRETARY]),
);

const teachersController = new TeachersController();

teachersRoutes.post('/', createTeacherValidate, teachersController.create);

teachersRoutes.get('/', listTeachersValidate, teachersController.index);

teachersRoutes.delete('/:id', deleteTeacherValidate, teachersController.delete);

teachersRoutes.put('/:id', updateTeacherValidate, teachersController.update);

teachersRoutes.get('/:id', showTeacherValidate, teachersController.show);

export { teachersRoutes };
