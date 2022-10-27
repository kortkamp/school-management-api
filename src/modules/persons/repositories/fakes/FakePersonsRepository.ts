import { ICreatePersonDTO } from '@modules/persons/dtos/ICreatePersonDTO';
import { FakePerson } from '@modules/persons/models/fakes/FakePerson';
import { IPerson } from '@modules/persons/models/IPerson';
import { IPersonsRepository } from '@modules/persons/repositories/IPersonsRepository';

class FakePersonsRepository implements IPersonsRepository {
  private persons: IPerson[] = [];

  public async findById(user_id: string): Promise<IPerson | undefined> {
    const findUser = this.persons.find(user => user.id === user_id);

    return findUser;
  }

  public async findByName(email: string): Promise<IPerson | undefined> {
    const person = this.persons.find(user => user.name === email);

    return person;
  }

  public async create(data: ICreatePersonDTO): Promise<IPerson> {
    const person = new FakePerson(data);
    this.persons.push(person);
    return person;
  }

  public async update(person: IPerson): Promise<IPerson> {
    this.persons = this.persons.map(oldPerson =>
      oldPerson.id !== person.id ? oldPerson : person,
    );

    return person;
  }

  public async getAll(): Promise<IPerson[]> {
    return this.persons;
  }

  public async getTotal(): Promise<number> {
    return this.persons.length;
  }

  public async save(data: IPerson): Promise<void> {
    const searchUser = this.persons.findIndex(user => user.id === data.id);

    if (searchUser >= 0) {
      Object.assign(this.persons[searchUser], data);
    }
  }

  public async delete(user: IPerson): Promise<void> {
    const listWithRemovedUsers = this.persons.filter(item => item.id !== user.id);
    this.persons = listWithRemovedUsers;
  }
}

export default FakePersonsRepository;
