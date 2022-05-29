import { ICreateGradeDTO } from '@modules/grades/dtos/ICreateGradeDTO';
import { GradesRepository } from '@modules/grades/infra/typeorm/repositories/GradesRepository';
import { Segments } from '@modules/grades/models/IGrade';

import 'dotenv/config';
import { AppDataSource } from '..';

async function create() {
  await AppDataSource.initialize();
  const gradesRepository = new GradesRepository();

  const grades: ICreateGradeDTO[] = [
    {
      name: 'Infantil 1',
      segment: Segments.infantil,
    },
    {
      name: 'Infantil 2',
      segment: Segments.infantil,
    },
    {
      name: 'Infantil 3',
      segment: Segments.infantil,
    },
    {
      name: 'Infantil 4',
      segment: Segments.infantil,
    },
    {
      name: 'Pre 1',
      segment: Segments.pre_escola,
    },
    {
      name: 'Pre 2',
      segment: Segments.pre_escola,
    },
    {
      name: 'Pre 3',
      segment: Segments.pre_escola,
    },
    {
      name: '1º Ano',
      segment: Segments.fundamental,
    },
    {
      name: '2º Ano',
      segment: Segments.fundamental,
    },
    {
      name: '3º Ano',
      segment: Segments.fundamental,
    },
    {
      name: '4º Ano',
      segment: Segments.fundamental,
    },
    {
      name: '5º Ano',
      segment: Segments.fundamental,
    },
    {
      name: '6º Ano',
      segment: Segments.fundamental,
    },
    {
      name: '7º Ano',
      segment: Segments.fundamental,
    },
    {
      name: '8º Ano',
      segment: Segments.fundamental,
    },
    {
      name: '9º Ano',
      segment: Segments.fundamental,
    },
    {
      name: '1º Ano',
      segment: Segments.medio,
    },
    {
      name: '2º Ano',
      segment: Segments.medio,
    },
    {
      name: '3º Ano',
      segment: Segments.medio,
    },
  ];

  const createGrades = grades.map(async grade =>
    gradesRepository.create(grade),
  );

  await Promise.all(createGrades);

  await AppDataSource.destroy();
}

create().then(() => console.log('Grades Created!'));
