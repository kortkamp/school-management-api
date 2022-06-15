import { CreateTeacherSubjects } from '@modules/teachers/services/CreateTeacherSubjects';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class TeacherSubjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createTeacherSubjects = container.resolve(CreateTeacherSubjects);

    const auth_user = request.user;

    const data = request.body;

    const teacherSubjects = await createTeacherSubjects.execute(data);

    return response.status(201).json({
      success: true,
      teacher_subjects: instanceToInstance(teacherSubjects),
    });
  }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const deleteTeacherSubjectService = container.resolve(DeleteTeacherSubjectService);

  //   const teacherId = request.params.id;

  //   await deleteTeacherService.execute(teacherId);

  //   return response.status(204).json({ success: true });
  // }
}

export { TeacherSubjectsController };
