import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { RoleTypes } from '@modules/roles/models/IRole';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { SchoolParametersController } from '../controllers/SchoolParametersController';
import {
  createSchoolParameterValidate,
  updateSchoolParameterValidate,
} from '../validations/schoolParameters.validation';

const schoolParametersRoutes = Router();

schoolParametersRoutes.use(authMiddleware);

const schoolParametersController = new SchoolParametersController();

schoolParametersRoutes.get('/', schoolParametersController.show);

schoolParametersRoutes.use(
  ensureRoles([RoleTypes.PRINCIPAL, RoleTypes.SECRETARY, RoleTypes.NEW_USER]),
);

schoolParametersRoutes.post(
  '/',
  createSchoolParameterValidate,
  schoolParametersController.create,
);

schoolParametersRoutes.put(
  '/:id',
  updateSchoolParameterValidate,
  schoolParametersController.update,
);

export { schoolParametersRoutes };
