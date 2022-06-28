import { ListStudentsResultsService } from '@modules/students/services/ListStudentsResultsService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class StudentsResultsController {
  public async listByClassSubject(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listStudentsResults = container.resolve(ListStudentsResultsService);

    const { user } = request;
    const subject_id = request.query.subject_id as string;
    const class_group_id = request.query.class_group_id as string;

    const students = await listStudentsResults.execute({
      user,
      subject_id,
      class_group_id,
    });

    return response
      .status(200)
      .json({ success: true, students: instanceToInstance(students) });
  }
}

export { StudentsResultsController };
