import { CreateCourseService } from '@modules/courses/services/CreateCourseService';
import { DeleteCourseService } from '@modules/courses/services/DeleteCourseService';
import { ListCoursesService } from '@modules/courses/services/ListCoursesService';
import { ShowCourseService } from '@modules/courses/services/ShowCourseService';
import { UpdateCourseService } from '@modules/courses/services/UpdateCourseService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CoursesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCoursesService = container.resolve(ListCoursesService);

    const school_id = request.school.id;
    const courses = await listCoursesService.execute(school_id);

    return response.json({
      success: true,
      courses: instanceToInstance(courses),
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createCourseService = container.resolve(CreateCourseService);

    const school_id = request.school.id;

    const data = request.body;
    const course = await createCourseService.execute({ data, school_id });

    return response
      .status(201)
      .json({ success: true, course: instanceToInstance(course) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteCourseService = container.resolve(DeleteCourseService);

    const courseId = request.params.id;

    const school_id = request.school.id;

    await deleteCourseService.execute(courseId, school_id);

    return response.status(200).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateCourseService = container.resolve(UpdateCourseService);

    const courseId = request.params.id;

    const data = request.body;

    const school_id = request.school.id;

    const course = await updateCourseService.execute({
      courseId,
      data,
      school_id,
    });

    return response.status(200).json({ success: true, course });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showCourseService = container.resolve(ShowCourseService);

    const courseId = request.params.id;

    const course = await showCourseService.execute(courseId);

    return response.status(200).json({ success: true, course });
  }
}

export { CoursesController };
