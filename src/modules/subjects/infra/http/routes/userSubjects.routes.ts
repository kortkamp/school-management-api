import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { ensureRolesOrSelf } from '@modules/roles/infra/http/middlewares/ensureRolesOrSelf';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { UserSubjectsController } from '../controllers/UserSubjectsController';
import {
  ListUserSubjectValidate,
  userSubjectValidate,
} from '../validations/userSubjects.validation';

const userSubjectsRoutes = Router();

userSubjectsRoutes.use(authMiddleware);

const userSubjectsController = new UserSubjectsController();

userSubjectsRoutes.get(
  '/:id',
  ensureRolesOrSelf(['admin']),
  ListUserSubjectValidate,
  userSubjectsController.index,
);

userSubjectsRoutes.post(
  '/',
  ensureRoles(['admin']),
  userSubjectValidate,
  userSubjectsController.create,
);

userSubjectsRoutes.delete(
  '/',
  ensureRoles(['admin']),
  userSubjectValidate,
  userSubjectsController.delete,
);

export { userSubjectsRoutes };
