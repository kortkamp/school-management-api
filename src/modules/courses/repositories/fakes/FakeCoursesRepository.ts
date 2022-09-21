import { ICreateCourseDTO } from '@modules/courses/dtos/ICreateCourseDTO';
import { FakeCourse } from '@modules/courses/models/fakes/FakeCourse';
import { ICourse } from '@modules/courses/models/ICourse';
import { ICoursesRepository } from '@modules/courses/repositories/ICoursesRepository';

class FakeCoursesRepository implements ICoursesRepository {
  private courses: ICourse[] = [];

  public async findById(user_id: string): Promise<ICourse | undefined> {
    const findUser = this.courses.find(user => user.id === user_id);

    return findUser;
  }

  public async findByName(email: string): Promise<ICourse | undefined> {
    const course = this.courses.find(user => user.name === email);

    return course;
  }

  public async create(data: ICreateCourseDTO): Promise<ICourse> {
    const course = new FakeCourse(data);
    this.courses.push(course);
    return course;
  }

  public async update(course: ICourse): Promise<ICourse> {
    this.courses = this.courses.map(oldCourse =>
      oldCourse.id !== course.id ? oldCourse : course,
    );

    return course;
  }

  public async getAll(): Promise<ICourse[]> {
    return this.courses;
  }

  public async getTotal(): Promise<number> {
    return this.courses.length;
  }

  public async save(data: ICourse): Promise<void> {
    const searchUser = this.courses.findIndex(user => user.id === data.id);

    if (searchUser >= 0) {
      Object.assign(this.courses[searchUser], data);
    }
  }

  public async delete(user: ICourse): Promise<void> {
    const listWithRemovedUsers = this.courses.filter(item => item.id !== user.id);
    this.courses = listWithRemovedUsers;
  }
}

export default FakeCoursesRepository;
