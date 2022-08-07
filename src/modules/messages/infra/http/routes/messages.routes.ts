import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { RoleTypes } from '@modules/roles/models/IRole';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { MessagesController } from '../controllers/MessagesController';
import {
  createMessageValidate,
  deleteMessageValidate,
  listMessagesValidate,
  showMessageValidate,
} from '../validations/messages.validation';

const messagesRoutes = Router();

messagesRoutes.use(authMiddleware);

const messagesController = new MessagesController();

messagesRoutes.post('/', createMessageValidate, messagesController.create);

messagesRoutes.get(
  '/user',
  listMessagesValidate,
  messagesController.indexByUser,
);

messagesRoutes.get(
  '/school/:school_id',
  ensureRoles([RoleTypes.PRINCIPAL, RoleTypes.SECRETARY]),
  listMessagesValidate,
  messagesController.indexBySchool,
);

messagesRoutes.delete('/:id', deleteMessageValidate, messagesController.delete);

messagesRoutes.get('/:id', showMessageValidate, messagesController.show);

export { messagesRoutes };
