import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { SchoolYearsController } from '../controllers/SchoolYearsController';
import {
  closeSchoolYearValidate,
  createSchoolYearValidate,
  deleteSchoolYearValidate,
  showSchoolYearValidate,
  updateSchoolYearValidate,
} from '../validations/schoolYears.validation';

const schoolYearsRoutes = Router();

schoolYearsRoutes.use(authMiddleware);

const schoolYearsController = new SchoolYearsController();

schoolYearsRoutes.post(
  '/',
  createSchoolYearValidate,
  schoolYearsController.create,
);

schoolYearsRoutes.patch(
  '/close/:id',
  closeSchoolYearValidate,
  schoolYearsController.close,
);

schoolYearsRoutes.get('/', schoolYearsController.index);

schoolYearsRoutes.delete(
  '/:id',
  deleteSchoolYearValidate,
  schoolYearsController.delete,
);

schoolYearsRoutes.put(
  '/:id',
  updateSchoolYearValidate,
  schoolYearsController.update,
);

schoolYearsRoutes.get('/current', schoolYearsController.showBySchool);

export { schoolYearsRoutes };
