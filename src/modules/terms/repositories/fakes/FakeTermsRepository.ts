import { ICreateTermDTO } from '@modules/terms/dtos/ICreateTermDTO';
import { FakeTerm } from '@modules/terms/models/fakes/FakeTerm';
import { ITerm } from '@modules/terms/models/ITerm';
import { ITermsRepository } from '@modules/terms/repositories/ITermsRepository';

class FakeTermsRepository implements ITermsRepository {
  private terms: ITerm[] = [];

  public async findById(user_id: string): Promise<ITerm | undefined> {
    const findUser = this.terms.find(user => user.id === user_id);

    return findUser;
  }

  public async findByName(email: string): Promise<ITerm | undefined> {
    const term = this.terms.find(user => user.name === email);

    return term;
  }

  public async create(data: ICreateTermDTO): Promise<ITerm> {
    const term = new FakeTerm(data);
    this.terms.push(term);
    return term;
  }

  public async update(term: ITerm): Promise<ITerm> {
    this.terms = this.terms.map(oldTerm =>
      oldTerm.id !== term.id ? oldTerm : term,
    );

    return term;
  }

  public async getAll(): Promise<ITerm[]> {
    return this.terms;
  }

  public async getTotal(): Promise<number> {
    return this.terms.length;
  }

  public async save(data: ITerm): Promise<void> {
    const searchUser = this.terms.findIndex(user => user.id === data.id);

    if (searchUser >= 0) {
      Object.assign(this.terms[searchUser], data);
    }
  }

  public async delete(user: ITerm): Promise<void> {
    const listWithRemovedUsers = this.terms.filter(item => item.id !== user.id);
    this.terms = listWithRemovedUsers;
  }
}

export default FakeTermsRepository;
