import { ICreateMessageDTO } from '@modules/messages/dtos/ICreateMessageDTO';
import { FakeMessage } from '@modules/messages/models/fakes/FakeMessage';
import { IMessage } from '@modules/messages/models/IMessage';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';

class FakeMessagesRepository implements IMessagesRepository {
  private messages: IMessage[] = [];

  public async findById(user_id: string): Promise<IMessage | undefined> {
    const findUser = this.messages.find(user => user.id === user_id);

    return findUser;
  }

  public async findByName(email: string): Promise<IMessage | undefined> {
    const message = this.messages.find(user => user.name === email);

    return message;
  }

  public async create(data: ICreateMessageDTO): Promise<IMessage> {
    const message = new FakeMessage(data);
    this.messages.push(message);
    return message;
  }

  public async update(message: IMessage): Promise<IMessage> {
    this.messages = this.messages.map(oldMessage =>
      oldMessage.id !== message.id ? oldMessage : message,
    );

    return message;
  }

  public async getAll(): Promise<IMessage[]> {
    return this.messages;
  }

  public async getTotal(): Promise<number> {
    return this.messages.length;
  }

  public async save(data: IMessage): Promise<void> {
    const searchUser = this.messages.findIndex(user => user.id === data.id);

    if (searchUser >= 0) {
      Object.assign(this.messages[searchUser], data);
    }
  }

  public async delete(user: IMessage): Promise<void> {
    const listWithRemovedUsers = this.messages.filter(item => item.id !== user.id);
    this.messages = listWithRemovedUsers;
  }
}

export default FakeMessagesRepository;
