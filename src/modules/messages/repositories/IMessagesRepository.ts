import { IFilterQuery } from 'typeorm-dynamic-filters';

import { ICreateMessageDTO } from '../dtos/ICreateMessageDTO';
import { IMessage } from '../models/IMessage';

interface IMessagesRepository {
  create(data: ICreateMessageDTO): Promise<IMessage>;
  getAll(query: IFilterQuery): Promise<[IMessage[], number]>;
  findById(
    userId: string,
    relations?: string[],
  ): Promise<IMessage | undefined>;
  save(dataUpdate: IMessage): Promise<void>;
  delete(user: IMessage): Promise<void>;
  getTotal(): Promise<number>;
}

export { IMessagesRepository };
