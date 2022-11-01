import { ICreatePersonDTO } from '@modules/persons/dtos/ICreatePersonDTO';
import { IPersonsRepository } from '@modules/persons/repositories/IPersonsRepository';
import { Repository } from 'typeorm';

import { customRepository } from '@shared/infra/tenantContext/tenantRepository';
import { AppDataSource } from '@shared/infra/typeorm';

import { Person } from '../models/Person';

class PersonsRepository implements IPersonsRepository {
  private ormRepository: Repository<Person>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Person>(Person).extend(
      customRepository(Person),
    );
  }

  public async create(data: ICreatePersonDTO): Promise<Person> {
    const newPerson = this.ormRepository.create(data);

    await this.ormRepository.save(newPerson);

    return newPerson;
  }

  public async getAll(relations: string[] = []): Promise<Person[]> {
    return this.ormRepository.find({ where: { active: false }, relations });
  }

  public async save(data: Person): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<Person | undefined> {
    const person = await this.ormRepository.findOne({
      where: { id },
      relations,
    });

    return person;
  }

  public async findByName(name: string): Promise<Person | undefined> {
    const person = await this.ormRepository.findOne({
      where: { name },
    });

    return person;
  }

  public async findByCPF(cpf: string): Promise<Person | undefined> {
    const person = await this.ormRepository.findOne({
      where: { cpf },
    });

    return person;
  }

  public async delete(person: Person): Promise<void> {
    await this.ormRepository.remove(person);
  }
}

export { PersonsRepository };
