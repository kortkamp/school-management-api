import { ICreateRoleDTO } from '@modules/roles/dtos/ICreateRoleDTO';
import { RolesRepository } from '@modules/roles/infra/typeorm/repositories/RolesRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { hash } from 'bcryptjs';

import 'dotenv/config';
import { AppDataSource } from '..';

async function create() {
  await AppDataSource.initialize();
  const rolesRepository = new RolesRepository();
  const usersRepository = new UsersRepository();

  const roleData: ICreateRoleDTO = {
    name: 'system-admin',
    display_name: 'System Admin',
  };

  const adminRole = await rolesRepository.create(roleData);

  const admin: ICreateUserDTO = {
    email: 'system-admin@template.com',
    name: 'System Admin',
    active: true,
    birth: new Date(),
    sex: 'M',
    role_id: adminRole.id,
    password: await hash('123456', 8),
  };

  await usersRepository.create(admin);
  await AppDataSource.destroy();
}

create().then(() => console.log('User admin Created!'));
