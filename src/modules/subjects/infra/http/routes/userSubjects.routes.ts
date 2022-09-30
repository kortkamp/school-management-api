import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { RoleTypes } from '@modules/roles/models/IRole';
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
  ensureRoles([RoleTypes.PRINCIPAL, RoleTypes.SECRETARY, RoleTypes.ADMIN]),
  ListUserSubjectValidate,
  userSubjectsController.index,
);

userSubjectsRoutes.post(
  '/',
  ensureRoles([RoleTypes.PRINCIPAL, RoleTypes.SECRETARY, RoleTypes.ADMIN]),

  userSubjectValidate,
  userSubjectsController.create,
);

userSubjectsRoutes.delete(
  '/',
  ensureRoles([RoleTypes.PRINCIPAL, RoleTypes.SECRETARY, RoleTypes.ADMIN]),
  userSubjectValidate,
  userSubjectsController.delete,
);

export { userSubjectsRoutes };
