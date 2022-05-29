import { ICreateSubjectDTO } from '@modules/subjects/dtos/ICreateSubjectDTO';
import { FakeSubject } from '@modules/subjects/models/fakes/FakeSubject';
import { ISubject } from '@modules/subjects/models/ISubject';
import { ISubjectsRepository } from '@modules/subjects/repositories/ISubjectsRepository';

class FakeSubjectsRepository implements ISubjectsRepository {
  private subjects: ISubject[] = [];

  public async findById(user_id: string): Promise<ISubject | undefined> {
    const findUser = this.subjects.find(user => user.id === user_id);

    return findUser;
  }

  public async findByName(email: string): Promise<ISubject | undefined> {
    const subject = this.subjects.find(user => user.name === email);

    return subject;
  }

  public async create(data: ICreateSubjectDTO): Promise<ISubject> {
    const subject = new FakeSubject(data);
    this.subjects.push(subject);
    return subject;
  }

  public async update(subject: ISubject): Promise<ISubject> {
    this.subjects = this.subjects.map(oldSubject =>
      oldSubject.id !== subject.id ? oldSubject : subject,
    );

    return subject;
  }

  public async getAll(): Promise<ISubject[]> {
    return this.subjects;
  }

  public async getTotal(): Promise<number> {
    return this.subjects.length;
  }

  public async save(data: ISubject): Promise<void> {
    const searchUser = this.subjects.findIndex(user => user.id === data.id);

    if (searchUser >= 0) {
      Object.assign(this.subjects[searchUser], data);
    }
  }

  public async delete(user: ISubject): Promise<void> {
    const listWithRemovedUsers = this.subjects.filter(item => item.id !== user.id);
    this.subjects = listWithRemovedUsers;
  }
}

export default FakeSubjectsRepository;
