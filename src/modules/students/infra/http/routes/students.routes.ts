import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { RoleTypes } from '@modules/roles/models/IRole';
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
import { studentsResultsRoutes } from './studentsResults.routes';

const studentsRoutes = Router();

studentsRoutes.use(authMiddleware);

const studentsController = new StudentsController();

studentsRoutes.use('/results', studentsResultsRoutes);

studentsRoutes.use('/allocations', studentAllocationsRoutes);

studentsRoutes.post(
  '/',
  ensureRoles([RoleTypes.PRINCIPAL, RoleTypes.SECRETARY]),
  createStudentValidate,
  studentsController.create,
);

studentsRoutes.get('/', listStudentsValidate, studentsController.index);

studentsRoutes.delete(
  '/:id',
  ensureRoles([RoleTypes.PRINCIPAL, RoleTypes.SECRETARY]),
  deleteStudentValidate,
  studentsController.delete,
);

studentsRoutes.put(
  '/:id',
  ensureRoles([RoleTypes.PRINCIPAL, RoleTypes.SECRETARY]),
  updateStudentValidate,
  studentsController.update,
);

studentsRoutes.get('/:id', showStudentValidate, studentsController.show);

export { studentsRoutes };
