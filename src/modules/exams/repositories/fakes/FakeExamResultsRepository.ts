import { ICreateExamResultDTO } from '@modules/examResults/dtos/ICreateExamResultDTO';
import { FakeExamResult } from '@modules/examResults/models/fakes/FakeExamResult';
import { IExamResult } from '@modules/examResults/models/IExamResult';
import { IExamResultsRepository } from '@modules/examResults/repositories/IExamResultsRepository';

class FakeExamResultsRepository implements IExamResultsRepository {
  private examResults: IExamResult[] = [];

  public async findById(user_id: string): Promise<IExamResult | undefined> {
    const findUser = this.examResults.find(user => user.id === user_id);

    return findUser;
  }

  public async findByName(email: string): Promise<IExamResult | undefined> {
    const examResult = this.examResults.find(user => user.name === email);

    return examResult;
  }

  public async create(data: ICreateExamResultDTO): Promise<IExamResult> {
    const examResult = new FakeExamResult(data);
    this.examResults.push(examResult);
    return examResult;
  }

  public async update(examResult: IExamResult): Promise<IExamResult> {
    this.examResults = this.examResults.map(oldExamResult =>
      oldExamResult.id !== examResult.id ? oldExamResult : examResult,
    );

    return examResult;
  }

  public async getAll(): Promise<IExamResult[]> {
    return this.examResults;
  }

  public async getTotal(): Promise<number> {
    return this.examResults.length;
  }

  public async save(data: IExamResult): Promise<void> {
    const searchUser = this.examResults.findIndex(user => user.id === data.id);

    if (searchUser >= 0) {
      Object.assign(this.examResults[searchUser], data);
    }
  }

  public async delete(user: IExamResult): Promise<void> {
    const listWithRemovedUsers = this.examResults.filter(
      item => item.id !== user.id,
    );
    this.examResults = listWithRemovedUsers;
  }
}

export default FakeExamResultsRepository;
