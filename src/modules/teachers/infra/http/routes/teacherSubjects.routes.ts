import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { Router } from 'express';

import { TeacherSubjectsController } from '../controllers/TeacherSubjectsController';
import {
  deleteTeacherSubjectValidate,
  createTeacherSubjectValidate,
} from '../validations/teacherSubjects.validation';

const teacherSubjectsRoutes = Router();

teacherSubjectsRoutes.use(ensureRoles(['admin']));

const teacherSubjectsController = new TeacherSubjectsController();

teacherSubjectsRoutes.post(
  '/',
  createTeacherSubjectValidate,
  teacherSubjectsController.create,
);

teacherSubjectsRoutes.delete(
  '/',
  deleteTeacherSubjectValidate,
  teacherSubjectsController.delete,
);

export { teacherSubjectsRoutes };
