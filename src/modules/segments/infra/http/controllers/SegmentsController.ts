import { CreateSegmentService } from '@modules/segments/services/CreateSegmentService';
import { DeleteSegmentService } from '@modules/segments/services/DeleteSegmentService';
import { ListSegmentsService } from '@modules/segments/services/ListSegmentsService';
import { ShowSegmentService } from '@modules/segments/services/ShowSegmentService';
import { UpdateSegmentService } from '@modules/segments/services/UpdateSegmentService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SegmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listSegmentsService = container.resolve(ListSegmentsService);

    const segments = await listSegmentsService.execute();

    return response.json({ success: true, segments: instanceToInstance(segments) });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createSegmentService = container.resolve(CreateSegmentService);

    const segment = await createSegmentService.execute(request.body);

    return response
      .status(201)
      .json({ success: true, segment: instanceToInstance(segment) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteSegmentService = container.resolve(DeleteSegmentService);

    const segmentId = request.params.id;

    await deleteSegmentService.execute(segmentId);

    return response.status(204).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateSegmentService = container.resolve(UpdateSegmentService);

    const segmentId = request.params.id;

    const data = request.body;

    const segment = await updateSegmentService.execute({ segmentId, data });

    return response.status(200).json({ success: true, segment });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showSegmentService = container.resolve(ShowSegmentService);

    const segmentId = request.params.id;

    const segment = await showSegmentService.execute(segmentId);

    return response.status(200).json({ success: true, segment });
  }
}

export { SegmentsController };
