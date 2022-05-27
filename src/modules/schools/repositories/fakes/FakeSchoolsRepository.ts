import { ICreateSchoolDTO } from '@modules/schools/dtos/ICreateSchoolDTO';
import { FakeSchool } from '@modules/schools/models/fakes/FakeSchool';
import { ISchool } from '@modules/schools/models/ISchool';
import { ISchoolsRepository } from '@modules/schools/repositories/ISchoolsRepository';

class FakeSchoolsRepository implements ISchoolsRepository {
  private schools: ISchool[] = [];

  public async findById(school_id: string): Promise<ISchool | undefined> {
    const foundSchool = this.schools.find(school => school.id === school_id);

    return foundSchool;
  }

  public async findByName(name: string): Promise<ISchool | undefined> {
    const school = this.schools.find(school => school.name === name);

    return school;
  }

  public async create(data: ICreateSchoolDTO): Promise<ISchool> {
    const school = new FakeSchool(data);
    this.schools.push(school);
    return school;
  }

  public async getAll(): Promise<ISchool[]> {
    return this.schools;
  }

  public async getTotal(): Promise<number> {
    return this.schools.length;
  }

  public async save(data: ISchool): Promise<void> {
    const searchSchool = this.schools.findIndex(
      school => school.id === data.id,
    );

    if (searchSchool >= 0) {
      Object.assign(this.schools[searchSchool], data);
    }
  }

  public async delete(user: ISchool): Promise<void> {
    const listWithRemovedUsers = this.schools.filter(
      item => item.id !== user.id,
    );
    this.schools = listWithRemovedUsers;
  }
}

export default FakeSchoolsRepository;
