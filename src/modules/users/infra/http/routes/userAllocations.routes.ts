import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { UserAllocationsController } from '../controllers/UserAllocationsController';
import { updateUserAllocationValidate } from '../validations/userAllocations.validation';

const userAllocationsRoutes = Router();

const userAllocationsController = new UserAllocationsController();

userAllocationsRoutes.use(authMiddleware);

userAllocationsRoutes.put(
  '/',
  ensureRoles(['admin']),
  updateUserAllocationValidate,
  userAllocationsController.update,
);

export { userAllocationsRoutes };
