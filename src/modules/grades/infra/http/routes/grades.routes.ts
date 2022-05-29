import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { GradesController } from '../controllers/GradesController';
import {
  createGradeValidate,
  deleteGradeValidate,
  showGradeValidate,
  updateGradeValidate,
} from '../validations/grades.validation';

const gradesRoutes = Router();

gradesRoutes.use(authMiddleware);

const gradesController = new GradesController();

gradesRoutes.post('/', createGradeValidate, gradesController.create);

gradesRoutes.get('/', gradesController.index);

gradesRoutes.delete('/:id', deleteGradeValidate, gradesController.delete);

gradesRoutes.put('/:id', updateGradeValidate, gradesController.update);

gradesRoutes.get('/:id', showGradeValidate, gradesController.show);

export { gradesRoutes };
