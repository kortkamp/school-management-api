import { ICreateClassGroupDTO } from '@modules/classGroups/dtos/ICreateClassGroupDTO';
import { FakeClassGroup } from '@modules/classGroups/models/fakes/FakeClassGroup';
import { IClassGroup } from '@modules/classGroups/models/IClassGroup';
import { IClassGroupsRepository } from '@modules/classGroups/repositories/IClassGroupsRepository';

class FakeClassGroupsRepository implements IClassGroupsRepository {
  private classGroups: IClassGroup[] = [];

  public async findById(user_id: string): Promise<IClassGroup | undefined> {
    const findUser = this.classGroups.find(user => user.id === user_id);

    return findUser;
  }

  public async findByName(email: string): Promise<IClassGroup | undefined> {
    const classGroup = this.classGroups.find(user => user.name === email);

    return classGroup;
  }

  public async create(data: ICreateClassGroupDTO): Promise<IClassGroup> {
    const classGroup = new FakeClassGroup(data);
    this.classGroups.push(classGroup);
    return classGroup;
  }

  public async update(classGroup: IClassGroup): Promise<IClassGroup> {
    this.classGroups = this.classGroups.map(oldClassGroup =>
      oldClassGroup.id !== classGroup.id ? oldClassGroup : classGroup,
    );

    return classGroup;
  }

  public async getAll(): Promise<IClassGroup[]> {
    return this.classGroups;
  }

  public async getTotal(): Promise<number> {
    return this.classGroups.length;
  }

  public async save(data: IClassGroup): Promise<void> {
    const searchUser = this.classGroups.findIndex(user => user.id === data.id);

    if (searchUser >= 0) {
      Object.assign(this.classGroups[searchUser], data);
    }
  }

  public async delete(user: IClassGroup): Promise<void> {
    const listWithRemovedUsers = this.classGroups.filter(item => item.id !== user.id);
    this.classGroups = listWithRemovedUsers;
  }
}

export default FakeClassGroupsRepository;
