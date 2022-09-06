import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IUser } from '../models/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  userCPF: string;
}
@injectable()
class FindByCPFService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ userCPF }: IRequest): Promise<IUser> {
    const user = await this.usersRepository.findByCPF(userCPF);

    if (!user) {
      throw new ErrorsApp('Usuário não encontrado', 404);
    }

    return user;
  }
}

export { FindByCPFService };
