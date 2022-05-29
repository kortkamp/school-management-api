import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { SubjectsController } from '../controllers/SubjectsController';
import {
  createSubjectValidate,
  deleteSubjectValidate,
  showSubjectValidate,
  updateSubjectValidate,
} from '../validations/subjects.validation';

const subjectsRoutes = Router();

subjectsRoutes.use(authMiddleware);

const subjectsController = new SubjectsController();

subjectsRoutes.post('/', createSubjectValidate, subjectsController.create);

subjectsRoutes.get('/', subjectsController.index);

subjectsRoutes.delete('/:id', deleteSubjectValidate, subjectsController.delete);

subjectsRoutes.put('/:id', updateSubjectValidate, subjectsController.update);

subjectsRoutes.get('/:id', showSubjectValidate, subjectsController.show);

export { subjectsRoutes };
