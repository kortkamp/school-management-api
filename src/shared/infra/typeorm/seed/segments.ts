import { ICreateGradeDTO } from '@modules/grades/dtos/ICreateGradeDTO';
import { GradesRepository } from '@modules/grades/infra/typeorm/repositories/GradesRepository';
import { ICreateSegmentDTO } from '@modules/segments/dtos/ICreateSegmentDTO';
import { SegmentsRepository } from '@modules/segments/infra/typeorm/repositories/SegmentsRepository';
import { ICreateSubjectDTO } from '@modules/subjects/dtos/ICreateSubjectDTO';
import { SubjectsRepository } from '@modules/subjects/infra/typeorm/repositories/SubjectsRepository';

import 'dotenv/config';
import { AppDataSource } from '..';

interface ISeed {
  segment: ICreateSegmentDTO;
  grades: Omit<ICreateGradeDTO, 'segment_id'>[];
  subjects: Omit<ICreateSubjectDTO, 'segment_id'>[];
}

async function create() {
  await AppDataSource.initialize();
  const segmentsRepository = new SegmentsRepository();
  const gradesRepository = new GradesRepository();
  const subjectsRepository = new SubjectsRepository();

  const seeds: ISeed[] = [
    {
      segment: { name: 'Infantil' },
      grades: [
        {
          name: 'Infantil 1',
        },
        {
          name: 'Infantil 2',
        },
        {
          name: 'Infantil 3',
        },
        {
          name: 'Infantil 4',
        },
      ],
      subjects: [],
    },
    {
      segment: { name: 'Fundamental I' },
      grades: [
        {
          name: '1º Ano',
        },
        {
          name: '2º Ano',
        },
        {
          name: '3º Ano',
        },
        {
          name: '4º Ano',
        },
      ],
      subjects: [
        {
          name: 'Lingua Portuguesa',
        },
        {
          name: 'Redação',
        },
        {
          name: 'Matemática',
        },
        {
          name: 'História',
        },
        {
          name: 'Geografia',
        },
        {
          name: 'Ciências',
        },
        {
          name: 'Artes',
        },
        {
          name: 'Educação Física',
        },
        {
          name: 'Inglês',
        },
      ],
    },
    {
      segment: { name: 'Fundamental II' },
      grades: [
        {
          name: '5º Ano',
        },
        {
          name: '6º Ano',
        },
        {
          name: '7º Ano',
        },
        {
          name: '8º Ano',
        },
        {
          name: '9º Ano',
        },
      ],
      subjects: [
        {
          name: 'Lingua Portuguesa',
        },
        {
          name: 'Redação',
        },
        {
          name: 'Matemática',
        },
        {
          name: 'História',
        },
        {
          name: 'Geografia',
        },
        {
          name: 'Ciências',
        },
        {
          name: 'Artes',
        },
        {
          name: 'Educação Física',
        },
        {
          name: 'Inglês',
        },
      ],
    },
    {
      segment: { name: 'Médio' },
      grades: [
        {
          name: '1º Ano',
        },
        {
          name: '2º Ano',
        },
        {
          name: '3º Ano',
        },
      ],
      subjects: [
        {
          name: 'Lingua Portuguesa',
        },
        {
          name: 'Matemática',
        },
        {
          name: 'Biologia',
        },
        {
          name: 'Física',
        },
        {
          name: 'Química',
        },
        {
          name: 'Artes',
        },
        {
          name: 'Educação Física',
        },
        {
          name: 'Língua Inglesa',
        },
        {
          name: 'Filosofia',
        },
        {
          name: 'Geografia',
        },
        {
          name: 'História',
        },
        {
          name: 'Sociologia',
        },
      ],
    },
  ];

  const createSeeds = seeds.map(async seed => {
    const segment = await segmentsRepository.create(seed.segment);
    console.log(`Created segment:${segment.id} ${segment.name} `);

    const createGrades = seed.grades.map(async grade =>
      gradesRepository.create({ ...grade, segment_id: segment.id }),
    );
    const grades = await Promise.all(createGrades);
    console.log(`Created ${grades.length} grades`);

    const createSubjects = seed.subjects.map(async subject =>
      subjectsRepository.create({ ...subject, segment_id: segment.id }),
    );
    const subjects = await Promise.all(createSubjects);
    console.log(`Created ${subjects.length} subjects`);
  });

  await Promise.all(createSeeds);

  await AppDataSource.destroy();
}

create().then(() => console.log('Database Seeded!'));
