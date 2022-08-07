import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateMessageDTO } from '../dtos/ICreateMessageDTO';
import FakeMessagesRepository from '../repositories/fakes/FakeMessagesRepository';
import { CreateMessageService } from './CreateMessageService';

let fakeMessagesRepository: FakeMessagesRepository;

let createMessageService: CreateMessageService;

let messageData: ICreateMessageDTO;

describe('CreateMessageService', () => {
  beforeEach(() => {
    fakeMessagesRepository = new FakeMessagesRepository();

    createMessageService = new CreateMessageService(fakeMessagesRepository);

    messageData = {
      name: 'User',
    };
  });

  it('Should be able to create a new message', async () => {
    const message = await createMessageService.execute(messageData);

    expect(message).toHaveProperty('id');
    expect(message).toHaveProperty('name');

    expect(message?.name).toBe(messageData.name);
  });

  it('Should not create 2 messages with same name ', async () => {
    await createMessageService.execute(messageData);

    await expect(
      createMessageService.execute(messageData),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
