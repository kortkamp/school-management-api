import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IMessage } from '../models/IMessage';
import FakeMessagesRepository from '../repositories/fakes/FakeMessagesRepository';
import { DeleteMessageService } from './DeleteMessageService';

let fakeMessagesRepository: FakeMessagesRepository;
let deleteMessageService: DeleteMessageService;
let message: IMessage;

describe('DeleteMessage', () => {
  const newMessageData = {
    name: 'message1',
  };

  beforeEach(async () => {
    fakeMessagesRepository = new FakeMessagesRepository();

    deleteMessageService = new DeleteMessageService(fakeMessagesRepository);

    message = await fakeMessagesRepository.create(newMessageData);
  });

  it('should be able to delete a message', async () => {
    const deleteMessageResult = await deleteMessageService.execute(message.id);

    const messages = await fakeMessagesRepository.getAll();

    expect(messages).toHaveLength(0);

    expect(deleteMessageResult).toBeUndefined();
  });

  it('should not be able to delete a message if it does not exist', async () => {
    await expect(
      deleteMessageService.execute('user non-existing'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
