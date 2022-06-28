import { Router } from 'express';

import { StudentsResultsController } from '../controllers/StudentsResultsController';
import { listStudentsResultsValidate } from '../validations/students.validation';

const studentsResultsRoutes = Router();

const userAllocationsController = new StudentsResultsController();

studentsResultsRoutes.get(
  '/',
  listStudentsResultsValidate,
  userAllocationsController.listByClassSubject,
);

export { studentsResultsRoutes };
