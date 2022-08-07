import { ICreateMessageDTO } from '@modules/messages/dtos/ICreateMessageDTO';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';
import { Repository } from 'typeorm';
import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';

import { AppDataSource } from '@shared/infra/typeorm';

import { Message } from '../models/Message';

class MessagesRepository implements IMessagesRepository {
  private ormRepository: Repository<Message>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Message>(Message);
  }

  public async getTotal(): Promise<number> {
    const total = await this.ormRepository.count();

    return total;
  }

  public async create(data: ICreateMessageDTO): Promise<Message> {
    const newMessage = this.ormRepository.create(data);

    await this.ormRepository.save(newMessage);

    return newMessage;
  }

  public async getAll(query: IFilterQuery): Promise<[Message[], number]> {
    const filterQueryBuilder = new FilterBuilder(this.ormRepository, 'message');

    const queryBuilder = filterQueryBuilder.build(query);

    queryBuilder
      .select([
        'message.id',
        'message.type',
        'message.title',
        'message.created_at',
        'message.text',
        'message.link',
      ])
      .leftJoin('message.sender', 'sender')
      .addSelect(['sender.id', 'sender.name']);

    const result = await queryBuilder.getManyAndCount();

    return result;
  }

  public async save(data: Message): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<Message | undefined> {
    const message = await this.ormRepository.findOne({
      where: { id },
      relations,
    });

    return message;
  }

  public async delete(message: Message): Promise<void> {
    await this.ormRepository.remove(message);
  }
}

export { MessagesRepository };
