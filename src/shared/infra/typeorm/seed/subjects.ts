import { ICreateSubjectDTO } from '@modules/subjects/dtos/ICreateSubjectDTO';
import { SubjectsRepository } from '@modules/subjects/infra/typeorm/repositories/SubjectsRepository';

import 'dotenv/config';
import { AppDataSource } from '..';

async function create() {
  await AppDataSource.initialize();
  const subjectsRepository = new SubjectsRepository();

  const grades: ICreateSubjectDTO[] = [
    {
      name: 'Matemática',
    },
  ];

  const createSubjects = grades.map(async grade =>
    subjectsRepository.create(grade),
  );

  await Promise.all(createSubjects);

  await AppDataSource.destroy();
}

create().then(() => console.log('Subjects Created!'));
