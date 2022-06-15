import { UpdateAllocation } from '@modules/students/services/UpdateAllocation';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class StudentAllocationsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateSegmentGradeClassService = container.resolve(UpdateAllocation);

    const user = await updateSegmentGradeClassService.execute(request.body);

    return response.json({ success: true, user: instanceToInstance(user) });
  }
}

export { StudentAllocationsController };
