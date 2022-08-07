import { ISchoolsRepository } from '@modules/schools/repositories/ISchoolsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateMessageDTO } from '../dtos/ICreateMessageDTO';
import { IMessagesRepository } from '../repositories/IMessagesRepository';

interface IRequest {
  data: Omit<ICreateMessageDTO, 'sender_id'>;
  authUserId: string;
}

@injectable()
class CreateMessageService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('SchoolsRepository')
    private schoolsRepository: ISchoolsRepository,
  ) {}

  public async execute({ data, authUserId }: IRequest) {
    if (data.user_id) {
      const userExists = await this.usersRepository.findById(data.user_id);
      if (!userExists) {
        throw new ErrorsApp('O usuário de destino não existe', 404);
      }
    }
    if (data.school_id) {
      const schoolExists = await this.schoolsRepository.findById(
        data.school_id,
      );
      if (!schoolExists) {
        throw new ErrorsApp('A escola não existe', 404);
      }
    }
    const messageData = Object.assign(data, { sender_id: authUserId });

    const message = await this.messagesRepository.create(messageData);

    return message;
  }
}

export { CreateMessageService };
