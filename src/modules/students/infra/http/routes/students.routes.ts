import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { StudentsController } from '../controllers/StudentsController';
import {
  createStudentValidate,
  deleteStudentValidate,
  listStudentsValidate,
  showStudentValidate,
  updateStudentValidate,
} from '../validations/students.validation';
import { studentAllocationsRoutes } from './studentsAllocations.routes';

const studentsRoutes = Router();

studentsRoutes.use(authMiddleware);

const studentsController = new StudentsController();

studentsRoutes.use('/allocations', studentAllocationsRoutes);

studentsRoutes.post(
  '/',
  ensureRoles(['admin']),
  createStudentValidate,
  studentsController.create,
);

studentsRoutes.get('/', listStudentsValidate, studentsController.index);

studentsRoutes.delete(
  '/:id',
  ensureRoles(['admin']),
  deleteStudentValidate,
  studentsController.delete,
);

studentsRoutes.put(
  '/:id',
  ensureRoles(['admin']),
  updateStudentValidate,
  studentsController.update,
);

studentsRoutes.get('/:id', showStudentValidate, studentsController.show);

export { studentsRoutes };
