import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { UserSubjectsController } from '../controllers/UserSubjectsController';
import {
  ListUserSubjectValidate,
  userSubjectValidate,
} from '../validations/userSubjects.validation';

const userSubjectsRoutes = Router();

userSubjectsRoutes.use(authMiddleware);

userSubjectsRoutes.use(ensureRoles(['admin']));

const userSubjectsController = new UserSubjectsController();

userSubjectsRoutes.get(
  '/:user_id',
  ListUserSubjectValidate,
  userSubjectsController.index,
);

userSubjectsRoutes.post(
  '/',
  userSubjectValidate,
  userSubjectsController.create,
);

userSubjectsRoutes.delete(
  '/',
  userSubjectValidate,
  userSubjectsController.delete,
);

export { userSubjectsRoutes };
