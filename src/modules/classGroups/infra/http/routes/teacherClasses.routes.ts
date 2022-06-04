import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { TeacherClassesController } from '../controllers/TeacherClassesController';
import { teacherClassValidate } from '../validations/teacherClasses.validation';

const teacherClassesRoutes = Router();

teacherClassesRoutes.use(authMiddleware);

const teacherClassesController = new TeacherClassesController();

teacherClassesRoutes.post(
  '/',
  teacherClassValidate,
  teacherClassesController.create,
);

teacherClassesRoutes.delete(
  '/',
  teacherClassValidate,
  teacherClassesController.delete,
);

export { teacherClassesRoutes };
