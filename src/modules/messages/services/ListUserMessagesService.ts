import { inject, injectable } from 'tsyringe';
import { IFilterQuery } from 'typeorm-dynamic-filters';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';

import { IMessagesRepository } from '../repositories/IMessagesRepository';

interface IRequest {
  query: IFilterQuery;
  authUserId: string;
}

@injectable()
class ListUserMessagesService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
  ) {}
  public async execute({
    authUserId,
    query,
  }: IRequest): Promise<IListResultInterface> {
    const { page, per_page } = query;

    query.filterBy.push('user_id');
    query.filterType.push('eq');
    query.filterValue.push(authUserId);

    const [messages, length] = await this.messagesRepository.getAll(query);

    return {
      result: messages,
      total_filtered: length,
      page,
      per_page,
      total_pages: Math.ceil(length / per_page),
    };
  }
}

export { ListUserMessagesService };
