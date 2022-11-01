import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { RoleTypes } from '@modules/roles/models/IRole';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { PersonsController } from '../controllers/PersonsController';
import {
  createPersonValidate,
  deletePersonValidate,
  findByCpfValidate,
  showPersonValidate,
  updatePersonValidate,
} from '../validations/persons.validation';

const personsRoutes = Router();

personsRoutes.use(authMiddleware);

const personsController = new PersonsController();

personsRoutes.use(
  ensureRoles([
    RoleTypes.REGISTER,
    RoleTypes.ADMIN,
    RoleTypes.PRINCIPAL,
    RoleTypes.SECRETARY,
  ]),
);

personsRoutes.post('/', createPersonValidate, personsController.create);

personsRoutes.get('/cpf/:cpf', findByCpfValidate, personsController.findByCPF);

personsRoutes.get('/inactive', personsController.index);

personsRoutes.delete('/:id', deletePersonValidate, personsController.delete);

personsRoutes.put('/:id', updatePersonValidate, personsController.update);

personsRoutes.get('/:id', showPersonValidate, personsController.show);

export { personsRoutes };
