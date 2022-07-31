import { ICreateRoleDTO } from '@modules/roles/dtos/ICreateRoleDTO';
import { RolesRepository } from '@modules/roles/infra/typeorm/repositories/RolesRepository';
import { RoleTypes } from '@modules/roles/models/IRole';

import 'dotenv/config';
import { AppDataSource } from '..';

async function create() {
  await AppDataSource.initialize();
  const rolesRepository = new RolesRepository();

  const rolesData: ICreateRoleDTO[] = [
    {
      type: RoleTypes.SYSTEM_ADMIN,
      name: 'System Admin',
    },
    {
      type: RoleTypes.ADMIN,
      name: 'Administrador',
    },
    {
      type: RoleTypes.PRINCIPAL,
      name: 'Diretor(a)',
    },
    {
      type: RoleTypes.SECRETARY,
      name: 'Secretário(a)',
    },
    {
      type: RoleTypes.TEACHER,
      name: 'Professor(a)',
    },
    {
      type: RoleTypes.STUDENT,
      name: 'Aluno(a)',
    },
    {
      type: RoleTypes.PARENT,
      name: 'Responsável',
    },
  ];

  const createRoles = rolesData.map(roleData =>
    rolesRepository.create(roleData),
  );

  await Promise.all(createRoles);

  await AppDataSource.destroy();
}

create().then(() => console.log('Roles Created!'));
