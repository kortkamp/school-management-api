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
  '/',
  listTeacherClassesValidate,
  teacherClassesController.index,
);

teacherClassesRoutes.post(
  '/',
  createTeacherClassValidate,
  teacherClassesController.create,
);

teacherClassesRoutes.delete(
  '/',
  deleteTeacherClassValidate,
  teacherClassesController.delete,
);

export { teacherClassesRoutes };
