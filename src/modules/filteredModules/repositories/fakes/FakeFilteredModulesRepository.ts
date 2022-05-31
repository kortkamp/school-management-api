import { ICreateFilteredModuleDTO } from '@modules/filteredModules/dtos/ICreateFilteredModuleDTO';
import { FakeFilteredModule } from '@modules/filteredModules/models/fakes/FakeFilteredModule';
import { IFilteredModule } from '@modules/filteredModules/models/IFilteredModule';
import { IFilteredModulesRepository } from '@modules/filteredModules/repositories/IFilteredModulesRepository';

class FakeFilteredModulesRepository implements IFilteredModulesRepository {
  private filteredModules: IFilteredModule[] = [];

  public async findById(user_id: string): Promise<IFilteredModule | undefined> {
    const findUser = this.filteredModules.find(user => user.id === user_id);

    return findUser;
  }

  public async findByName(email: string): Promise<IFilteredModule | undefined> {
    const filteredModule = this.filteredModules.find(user => user.name === email);

    return filteredModule;
  }

  public async create(data: ICreateFilteredModuleDTO): Promise<IFilteredModule> {
    const filteredModule = new FakeFilteredModule(data);
    this.filteredModules.push(filteredModule);
    return filteredModule;
  }

  public async update(filteredModule: IFilteredModule): Promise<IFilteredModule> {
    this.filteredModules = this.filteredModules.map(oldFilteredModule =>
      oldFilteredModule.id !== filteredModule.id ? oldFilteredModule : filteredModule,
    );

    return filteredModule;
  }

  public async getAll(): Promise<IFilteredModule[]> {
    return this.filteredModules;
  }

  public async getTotal(): Promise<number> {
    return this.filteredModules.length;
  }

  public async save(data: IFilteredModule): Promise<void> {
    const searchUser = this.filteredModules.findIndex(user => user.id === data.id);

    if (searchUser >= 0) {
      Object.assign(this.filteredModules[searchUser], data);
    }
  }

  public async delete(user: IFilteredModule): Promise<void> {
    const listWithRemovedUsers = this.filteredModules.filter(item => item.id !== user.id);
    this.filteredModules = listWithRemovedUsers;
  }
}

export default FakeFilteredModulesRepository;
