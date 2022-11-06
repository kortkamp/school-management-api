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
      is_employee: true,
    },
    {
      type: RoleTypes.ADMIN,
      name: 'Administrador',
      is_employee: true,
    },
    {
      type: RoleTypes.REGISTER,
      name: 'Registro',
      is_employee: true,
    },
    {
      type: RoleTypes.PRINCIPAL,
      name: 'Diretor(a)',
      is_employee: true,
    },
    {
      type: RoleTypes.SECRETARY,
      name: 'Secretário(a)',
      is_employee: true,
    },
    {
      type: RoleTypes.TEACHER,
      name: 'Professor(a)',
      is_employee: true,
    },
    {
      type: RoleTypes.STUDENT,
      name: 'Aluno(a)',
      is_employee: false,
    },
    {
      type: RoleTypes.PARENT,
      name: 'Responsável',
      is_employee: false,
    },
  ];

  const createRoles = rolesData.map(roleData =>
    rolesRepository.create(roleData),
  );

  await Promise.all(createRoles);

  await AppDataSource.destroy();
}

create().then(() => console.log('Roles Created!'));
