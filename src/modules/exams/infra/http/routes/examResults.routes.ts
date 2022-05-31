import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { ExamResultsController } from '../controllers/ExamResultsController';
import {
  createExamResultValidate,
  deleteExamResultValidate,
  listExamResultsValidate,
  showExamResultValidate,
  updateExamResultValidate,
} from '../validations/examResults.validation';

const examResultsRoutes = Router();

examResultsRoutes.use(authMiddleware);

const examResultsController = new ExamResultsController();

examResultsRoutes.post(
  '/',
  ensureRoles(['teacher']),
  createExamResultValidate,
  examResultsController.create,
);

examResultsRoutes.get(
  '/',
  listExamResultsValidate,
  examResultsController.index,
);

examResultsRoutes.delete(
  '/:id',
  deleteExamResultValidate,
  examResultsController.delete,
);

examResultsRoutes.put(
  '/:id',
  updateExamResultValidate,
  examResultsController.update,
);

examResultsRoutes.get(
  '/:id',
  showExamResultValidate,
  examResultsController.show,
);

export { examResultsRoutes };
