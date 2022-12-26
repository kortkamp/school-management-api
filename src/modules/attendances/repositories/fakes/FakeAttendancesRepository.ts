import { ICreateAttendanceDTO } from '@modules/attendances/dtos/ICreateAttendanceDTO';
import { FakeAttendance } from '@modules/attendances/models/fakes/FakeAttendance';
import { IAttendance } from '@modules/attendances/models/IAttendance';
import { IAttendancesRepository } from '@modules/attendances/repositories/IAttendancesRepository';

class FakeAttendancesRepository implements IAttendancesRepository {
  private attendances: IAttendance[] = [];

  public async findById(user_id: string): Promise<IAttendance | undefined> {
    const findUser = this.attendances.find(user => user.id === user_id);

    return findUser;
  }

  public async findByName(email: string): Promise<IAttendance | undefined> {
    const attendance = this.attendances.find(user => user.name === email);

    return attendance;
  }

  public async create(data: ICreateAttendanceDTO): Promise<IAttendance> {
    const attendance = new FakeAttendance(data);
    this.attendances.push(attendance);
    return attendance;
  }

  public async update(attendance: IAttendance): Promise<IAttendance> {
    this.attendances = this.attendances.map(oldAttendance =>
      oldAttendance.id !== attendance.id ? oldAttendance : attendance,
    );

    return attendance;
  }

  public async getAll(): Promise<IAttendance[]> {
    return this.attendances;
  }

  public async getTotal(): Promise<number> {
    return this.attendances.length;
  }

  public async save(data: IAttendance): Promise<void> {
    const searchUser = this.attendances.findIndex(user => user.id === data.id);

    if (searchUser >= 0) {
      Object.assign(this.attendances[searchUser], data);
    }
  }

  public async delete(user: IAttendance): Promise<void> {
    const listWithRemovedUsers = this.attendances.filter(item => item.id !== user.id);
    this.attendances = listWithRemovedUsers;
  }
}

export default FakeAttendancesRepository;
