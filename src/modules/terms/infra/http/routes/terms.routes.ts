import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { TermsController } from '../controllers/TermsController';
import {
  createTermValidate,
  deleteTermValidate,
  showTermValidate,
  updateTermValidate,
} from '../validations/terms.validation';

const termsRoutes = Router();

termsRoutes.use(authMiddleware);

const termsController = new TermsController();

termsRoutes.get('/', termsController.index);

termsRoutes.get('/:id', showTermValidate, termsController.show);

termsRoutes.use(ensureRoles(['admin']));

termsRoutes.post('/', createTermValidate, termsController.create);

termsRoutes.delete('/:id', deleteTermValidate, termsController.delete);

termsRoutes.put('/:id', updateTermValidate, termsController.update);

export { termsRoutes };
