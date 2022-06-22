import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
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

examsRoutes.post(
  '/',
  ensureRoles(['teacher', 'admin']),
  createExamValidate,
  examsController.create,
);

examsRoutes.get('/', listExamsValidate, examsController.index);

examsRoutes.get(
  '/subject',
  listExamsByClassSubjectValidate,
  examsController.listByClassSubject,
);

examsRoutes.delete('/:id', deleteExamValidate, examsController.delete);

examsRoutes.put('/:id', updateExamValidate, examsController.update);

examsRoutes.get('/:id', showExamValidate, examsController.show);

export { examsRoutes };
