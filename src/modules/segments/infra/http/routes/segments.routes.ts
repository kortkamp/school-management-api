import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { SegmentsController } from '../controllers/SegmentsController';
import {
  createSegmentValidate,
  deleteSegmentValidate,
  showSegmentValidate,
  updateSegmentValidate,
} from '../validations/segments.validation';

const segmentsRoutes = Router();

segmentsRoutes.use(authMiddleware);

const segmentsController = new SegmentsController();

segmentsRoutes.post('/', createSegmentValidate, segmentsController.create);

segmentsRoutes.get('/', segmentsController.index);

segmentsRoutes.delete('/:id', deleteSegmentValidate, segmentsController.delete);

segmentsRoutes.put('/:id', updateSegmentValidate, segmentsController.update);

segmentsRoutes.get('/:id', showSegmentValidate, segmentsController.show);

export { segmentsRoutes };
