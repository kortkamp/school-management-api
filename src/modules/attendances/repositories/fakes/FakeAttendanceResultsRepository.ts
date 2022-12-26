import { ICreateAttendanceResultDTO } from '@modules/attendanceResults/dtos/ICreateAttendanceResultDTO';
import { FakeAttendanceResult } from '@modules/attendanceResults/models/fakes/FakeAttendanceResult';
import { IAttendanceResult } from '@modules/attendanceResults/models/IAttendanceResult';
import { IAttendanceResultsRepository } from '@modules/attendanceResults/repositories/IAttendanceResultsRepository';

class FakeAttendanceResultsRepository implements IAttendanceResultsRepository {
  private attendanceResults: IAttendanceResult[] = [];

  public async findById(user_id: string): Promise<IAttendanceResult | undefined> {
    const findUser = this.attendanceResults.find(user => user.id === user_id);

    return findUser;
  }

  public async findByName(email: string): Promise<IAttendanceResult | undefined> {
    const attendanceResult = this.attendanceResults.find(user => user.name === email);

    return attendanceResult;
  }

  public async create(data: ICreateAttendanceResultDTO): Promise<IAttendanceResult> {
    const attendanceResult = new FakeAttendanceResult(data);
    this.attendanceResults.push(attendanceResult);
    return attendanceResult;
  }

  public async update(attendanceResult: IAttendanceResult): Promise<IAttendanceResult> {
    this.attendanceResults = this.attendanceResults.map(oldAttendanceResult =>
      oldAttendanceResult.id !== attendanceResult.id ? oldAttendanceResult : attendanceResult,
    );

    return attendanceResult;
  }

  public async getAll(): Promise<IAttendanceResult[]> {
    return this.attendanceResults;
  }

  public async getTotal(): Promise<number> {
    return this.attendanceResults.length;
  }

  public async save(data: IAttendanceResult): Promise<void> {
    const searchUser = this.attendanceResults.findIndex(user => user.id === data.id);

    if (searchUser >= 0) {
      Object.assign(this.attendanceResults[searchUser], data);
    }
  }

  public async delete(user: IAttendanceResult): Promise<void> {
    const listWithRemovedUsers = this.attendanceResults.filter(
      item => item.id !== user.id,
    );
    this.attendanceResults = listWithRemovedUsers;
  }
}

export default FakeAttendanceResultsRepository;
