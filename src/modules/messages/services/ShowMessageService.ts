import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IMessagesRepository } from '../repositories/IMessagesRepository';

@injectable()
class ShowMessageService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
  ) {}
  public async execute(messageId: string) {
    const message = await this.messagesRepository.findById(messageId);
    if (!message) {
      throw new ErrorsApp('Message does not exists', 404);
    }

    return message;
  }
}

export { ShowMessageService };
