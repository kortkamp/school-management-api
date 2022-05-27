import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { SchoolsController } from '../controllers/SchoolsController';
import {
  createSchoolValidate,
  deleteSchoolValidate,
  showSchoolValidate,
  updateSchoolValidate,
} from '../validations/schools.validation';

const schoolsRoutes = Router();

schoolsRoutes.use(authMiddleware);

const schoolsController = new SchoolsController();

schoolsRoutes.post('/', createSchoolValidate, schoolsController.create);

schoolsRoutes.get('/', schoolsController.index);

schoolsRoutes.delete('/:id', deleteSchoolValidate, schoolsController.delete);

schoolsRoutes.put('/:id', updateSchoolValidate, schoolsController.update);

schoolsRoutes.get('/:id', showSchoolValidate, schoolsController.show);

export { schoolsRoutes };
