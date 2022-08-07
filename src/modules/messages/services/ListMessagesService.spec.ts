import 'reflect-metadata';

import { ICreateMessageDTO } from '../dtos/ICreateMessageDTO';
import FakeMessagesRepository from '../repositories/fakes/FakeMessagesRepository';
import { ListMessagesService } from './ListMessagesService';

let fakeMessagesRepository: FakeMessagesRepository;

let listMessagesService: ListMessagesService;

let messageData: ICreateMessageDTO;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeMessagesRepository = new FakeMessagesRepository();

    listMessagesService = new ListMessagesService(fakeMessagesRepository);

    messageData = {
      name: 'message1',
    };
  });

  it('Should be able to list messages', async () => {
    const message1 = await fakeMessagesRepository.create(messageData);

    const message2 = await fakeMessagesRepository.create({
      ...messageData,
      name: 'message2',
    });

    const messages = await listMessagesService.execute();

    expect(messages).toEqual([message1, message2]);
  });
});
