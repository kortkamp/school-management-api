import { ICreateGradeDTO } from '@modules/grades/dtos/ICreateGradeDTO';
import { FakeGrade } from '@modules/grades/models/fakes/FakeGrade';
import { IGrade } from '@modules/grades/models/IGrade';
import { IGradesRepository } from '@modules/grades/repositories/IGradesRepository';

class FakeGradesRepository implements IGradesRepository {
  private grades: IGrade[] = [];

  public async findById(user_id: string): Promise<IGrade | undefined> {
    const findUser = this.grades.find(user => user.id === user_id);

    return findUser;
  }

  public async findByName(email: string): Promise<IGrade | undefined> {
    const grade = this.grades.find(user => user.name === email);

    return grade;
  }

  public async create(data: ICreateGradeDTO): Promise<IGrade> {
    const grade = new FakeGrade(data);
    this.grades.push(grade);
    return grade;
  }

  public async update(grade: IGrade): Promise<IGrade> {
    this.grades = this.grades.map(oldGrade =>
      oldGrade.id !== grade.id ? oldGrade : grade,
    );

    return grade;
  }

  public async getAll(): Promise<IGrade[]> {
    return this.grades;
  }

  public async getTotal(): Promise<number> {
    return this.grades.length;
  }

  public async save(data: IGrade): Promise<void> {
    const searchUser = this.grades.findIndex(user => user.id === data.id);

    if (searchUser >= 0) {
      Object.assign(this.grades[searchUser], data);
    }
  }

  public async delete(user: IGrade): Promise<void> {
    const listWithRemovedUsers = this.grades.filter(item => item.id !== user.id);
    this.grades = listWithRemovedUsers;
  }
}

export default FakeGradesRepository;
