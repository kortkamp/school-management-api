import { ICreateSchoolYearDTO } from '@modules/schoolYears/dtos/ICreateSchoolYearDTO';
import { FakeSchoolYear } from '@modules/schoolYears/models/fakes/FakeSchoolYear';
import { ISchoolYear } from '@modules/schoolYears/models/ISchoolYear';
import { ISchoolYearsRepository } from '@modules/schoolYears/repositories/ISchoolYearsRepository';

class FakeSchoolYearsRepository implements ISchoolYearsRepository {
  private schoolYears: ISchoolYear[] = [];

  public async findById(user_id: string): Promise<ISchoolYear | undefined> {
    const findUser = this.schoolYears.find(user => user.id === user_id);

    return findUser;
  }

  public async findByName(email: string): Promise<ISchoolYear | undefined> {
    const schoolYear = this.schoolYears.find(user => user.name === email);

    return schoolYear;
  }

  public async create(data: ICreateSchoolYearDTO): Promise<ISchoolYear> {
    const schoolYear = new FakeSchoolYear(data);
    this.schoolYears.push(schoolYear);
    return schoolYear;
  }

  public async update(schoolYear: ISchoolYear): Promise<ISchoolYear> {
    this.schoolYears = this.schoolYears.map(oldSchoolYear =>
      oldSchoolYear.id !== schoolYear.id ? oldSchoolYear : schoolYear,
    );

    return schoolYear;
  }

  public async getAll(): Promise<ISchoolYear[]> {
    return this.schoolYears;
  }

  public async getTotal(): Promise<number> {
    return this.schoolYears.length;
  }

  public async save(data: ISchoolYear): Promise<void> {
    const searchUser = this.schoolYears.findIndex(user => user.id === data.id);

    if (searchUser >= 0) {
      Object.assign(this.schoolYears[searchUser], data);
    }
  }

  public async delete(user: ISchoolYear): Promise<void> {
    const listWithRemovedUsers = this.schoolYears.filter(item => item.id !== user.id);
    this.schoolYears = listWithRemovedUsers;
  }
}

export default FakeSchoolYearsRepository;
