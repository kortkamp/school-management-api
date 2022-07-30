import { ICreateRoleDTO } from '@modules/roles/dtos/ICreateRoleDTO';
import { RolesRepository } from '@modules/roles/infra/typeorm/repositories/RolesRepository';

import 'dotenv/config';
import { AppDataSource } from '..';

async function create() {
  await AppDataSource.initialize();
  const rolesRepository = new RolesRepository();

  const rolesData: ICreateRoleDTO[] = [
    {
      name: 'system-admin',
      display_name: 'System Admin',
    },
    {
      name: 'admin',
      display_name: 'Administrador',
    },
    {
      name: 'principal',
      display_name: 'Diretor(a)',
    },
    {
      name: 'secretary',
      display_name: 'Secretário(a)',
    },
    {
      name: 'teacher',
      display_name: 'Professor(a)',
    },
    {
      name: 'student',
      display_name: 'Aluno(a)',
    },
    {
      name: 'parent',
      display_name: 'Responsável',
    },
  ];

  const createRoles = rolesData.map(roleData =>
    rolesRepository.create(roleData),
  );

  await Promise.all(createRoles);

  await AppDataSource.destroy();
}

create().then(() => console.log('Roles Created!'));
