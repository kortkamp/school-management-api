import { CreatePersonService } from '@modules/persons/services/CreatePersonService';
import { DeletePersonService } from '@modules/persons/services/DeletePersonService';
import { FindPersonByCPFService } from '@modules/persons/services/FindPersonByCPFService';
import { ListPersonsService } from '@modules/persons/services/ListPersonsService';
import { ShowPersonService } from '@modules/persons/services/ShowPersonService';
import { UpdatePersonService } from '@modules/persons/services/UpdatePersonService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class PersonsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listPersonsService = container.resolve(ListPersonsService);

    const persons = await listPersonsService.execute();

    return response.json({
      success: true,
      persons: instanceToInstance(persons),
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createPersonService = container.resolve(CreatePersonService);

    const authUser = request.user;

    const authSchoolId = request.school.id;

    const person = await createPersonService.execute({
      authSchoolId,
      authUser,
      data: request.body,
    });

    return response
      .status(201)
      .json({ success: true, person: instanceToInstance(person) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deletePersonService = container.resolve(DeletePersonService);

    const personId = request.params.id;

    await deletePersonService.execute(personId);

    return response.status(204).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updatePersonService = container.resolve(UpdatePersonService);

    const personId = request.params.id;

    const data = request.body;

    const person = await updatePersonService.execute({ personId, data });

    return response.status(200).json({ success: true, person });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showPersonService = container.resolve(ShowPersonService);

    const personId = request.params.id;

    const person = await showPersonService.execute(personId);

    return response.status(200).json({ success: true, person });
  }

  public async findByCPF(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findPersonByCPFService = container.resolve(FindPersonByCPFService);

    const { cpf } = request.params;

    const person = await findPersonByCPFService.execute(cpf);

    return response
      .status(200)
      .json({ success: true, person: instanceToInstance(person) });
  }
}

export { PersonsController };
