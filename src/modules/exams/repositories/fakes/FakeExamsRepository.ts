import { ICreateExamDTO } from '@modules/exams/dtos/ICreateExamDTO';
import { FakeExam } from '@modules/exams/models/fakes/FakeExam';
import { IExam } from '@modules/exams/models/IExam';
import { IExamsRepository } from '@modules/exams/repositories/IExamsRepository';

class FakeExamsRepository implements IExamsRepository {
  private exams: IExam[] = [];

  public async findById(user_id: string): Promise<IExam | undefined> {
    const findUser = this.exams.find(user => user.id === user_id);

    return findUser;
  }

  public async findByName(email: string): Promise<IExam | undefined> {
    const exam = this.exams.find(user => user.name === email);

    return exam;
  }

  public async create(data: ICreateExamDTO): Promise<IExam> {
    const exam = new FakeExam(data);
    this.exams.push(exam);
    return exam;
  }

  public async update(exam: IExam): Promise<IExam> {
    this.exams = this.exams.map(oldExam =>
      oldExam.id !== exam.id ? oldExam : exam,
    );

    return exam;
  }

  public async getAll(): Promise<IExam[]> {
    return this.exams;
  }

  public async getTotal(): Promise<number> {
    return this.exams.length;
  }

  public async save(data: IExam): Promise<void> {
    const searchUser = this.exams.findIndex(user => user.id === data.id);

    if (searchUser >= 0) {
      Object.assign(this.exams[searchUser], data);
    }
  }

  public async delete(user: IExam): Promise<void> {
    const listWithRemovedUsers = this.exams.filter(item => item.id !== user.id);
    this.exams = listWithRemovedUsers;
  }
}

export default FakeExamsRepository;
