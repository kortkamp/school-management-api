import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IRoutine } from '../models/IRoutine';
import { IRoutinesRepository } from '../repositories/IRoutinesRepository';

interface IRequest {
  auth_user: {
    id: string;
    role: string;
    class_group_id?: string;
  };
  user_id: string;
}

@injectable()
class ListRoutinesByUserService {
  constructor(
    @inject('RoutinesRepository')
    private routinesRepository: IRoutinesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ user_id, auth_user }: IRequest): Promise<IRoutine[]> {
    let user = auth_user;

    if (user_id !== auth_user.id) {
      const userData = await this.usersRepository.findById(user_id, ['role']);
      if (!userData) {
        throw new ErrorsApp('Usuário nao encontrado', 404);
      }
      user = {
        id: userData.id,
        role: userData.role.name,
        class_group_id: userData.class_group_id,
      };
    }

    switch (user.role) {
      case 'teacher':
        return this.routinesRepository.getAllByTeacher(user_id);

      case 'student':
        if (!user.class_group_id) {
          return [] as IRoutine[];
        }
        return this.routinesRepository.getAllByClassGroup(user.class_group_id);
      default:
        throw new ErrorsApp('Usuário nao autorizado a listar horários', 403);
    }
  }
}

export { ListRoutinesByUserService };
