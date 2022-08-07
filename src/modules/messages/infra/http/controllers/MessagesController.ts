import { CreateMessageService } from '@modules/messages/services/CreateMessageService';
import { DeleteMessageService } from '@modules/messages/services/DeleteMessageService';
import { ListSchoolMessagesService } from '@modules/messages/services/ListSchoolMessagesService';
import { ListUserMessagesService } from '@modules/messages/services/ListUserMessagesService';
import { ShowMessageService } from '@modules/messages/services/ShowMessageService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseQueryFilters } from 'typeorm-dynamic-filters';

class MessagesController {
  public async indexByUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listMessagesService = container.resolve(ListUserMessagesService);

    const authUserId = request.user.id;

    const messages = await listMessagesService.execute({
      query: parseQueryFilters(request.query),
      authUserId,
    });

    return response.json({
      success: true,
      messages: instanceToInstance(messages),
    });
  }

  public async indexBySchool(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listMessagesService = container.resolve(ListSchoolMessagesService);

    const schoolId = request.params.school_id;

    console.log(schoolId);

    const messages = await listMessagesService.execute({
      query: parseQueryFilters(request.query),
      schoolId,
    });

    return response.json({
      success: true,
      messages: instanceToInstance(messages),
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createMessageService = container.resolve(CreateMessageService);

    const authUserId = request.user.id;

    const data = request.body;

    const message = await createMessageService.execute({ authUserId, data });

    return response
      .status(201)
      .json({ success: true, message: instanceToInstance(message) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteMessageService = container.resolve(DeleteMessageService);

    const messageId = request.params.id;

    await deleteMessageService.execute(messageId);

    return response.status(204).json({ success: true });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showMessageService = container.resolve(ShowMessageService);

    const messageId = request.params.id;

    const message = await showMessageService.execute(messageId);

    return response.status(200).json({ success: true, message });
  }
}

export { MessagesController };
