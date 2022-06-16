import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { Router } from 'express';

import { TeacherSubjectsController } from '../controllers/TeacherSubjectsController';

const teacherSubjectsRoutes = Router();

teacherSubjectsRoutes.use(ensureRoles(['admin']));

const teacherSubjectsController = new TeacherSubjectsController();

teacherSubjectsRoutes.post('/', teacherSubjectsController.create);

// teacherSubjectsRoutes.delete(
//   '/',
//   userSubjectValidate,
//   userSubjectsController.delete,
// );

export { teacherSubjectsRoutes };
