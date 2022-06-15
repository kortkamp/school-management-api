import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { StudentAllocationsController } from '../controllers/StudentAllocationsController';
import { updateStudentAllocationValidate } from '../validations/studentAllocations.validation';

const studentAllocationsRoutes = Router();

const userAllocationsController = new StudentAllocationsController();

studentAllocationsRoutes.use(authMiddleware);

studentAllocationsRoutes.put(
  '/',
  ensureRoles(['admin']),
  updateStudentAllocationValidate,
  userAllocationsController.update,
);

export { studentAllocationsRoutes };
