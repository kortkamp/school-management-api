import { UpdateSegmentGradeClassService } from '@modules/users/services/UpdateSegmentGradeClassService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UserAllocationsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateSegmentGradeClassService = container.resolve(
      UpdateSegmentGradeClassService,
    );

    const user = await updateSegmentGradeClassService.execute(request.body);

    return response.json({ success: true, user: instanceToInstance(user) });
  }
}

export { UserAllocationsController };
