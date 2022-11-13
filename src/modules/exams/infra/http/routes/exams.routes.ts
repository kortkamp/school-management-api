import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { RoleTypes } from '@modules/roles/models/IRole';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { ExamsController } from '../controllers/ExamsController';
import {
  createExamValidate,
  deleteExamValidate,
  listExamsByClassSubjectValidate,
  listExamsValidate,
  showExamValidate,
  updateExamValidate,
} from '../validations/exams.validation';
import { examResultsRoutes } from './examResults.routes';

const examsRoutes = Router();

examsRoutes.use(authMiddleware);

const examsController = new ExamsController();

examsRoutes.use('/results', examResultsRoutes);

examsRoutes.get(
  '/',
  ensureRoles([RoleTypes.PRINCIPAL, RoleTypes.SECRETARY, RoleTypes.STUDENT]),
  listExamsValidate,
  examsController.index,
);

// examsRoutes.get(
//   '/subject',
//   listExamsByClassSubjectValidate,
//   examsController.listByClassSubject,
// );

examsRoutes.post(
  '/',
  ensureRoles([RoleTypes.TEACHER]),
  createExamValidate,
  examsController.create,
);

examsRoutes.get(
  '/teacher',
  ensureRoles([RoleTypes.TEACHER]),
  listExamsValidate,
  examsController.indexByTeacher,
);

examsRoutes.delete(
  '/:id',
  ensureRoles([RoleTypes.TEACHER]),
  deleteExamValidate,
  examsController.delete,
);

examsRoutes.put(
  '/:id',
  ensureRoles([RoleTypes.TEACHER]),
  updateExamValidate,
  examsController.update,
);

// examsRoutes.get('/:id', showExamValidate, examsController.show);

export { examsRoutes };
