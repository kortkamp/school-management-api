import { ICreateSegmentDTO } from '@modules/segments/dtos/ICreateSegmentDTO';
import { SegmentsRepository } from '@modules/segments/infra/typeorm/repositories/SegmentsRepository';
import { ICreateSubjectDTO } from '@modules/subjects/dtos/ICreateSubjectDTO';
import { SubjectsRepository } from '@modules/subjects/infra/typeorm/repositories/SubjectsRepository';

import 'dotenv/config';
import { AppDataSource } from '..';

interface ISeed {
  segment: ICreateSegmentDTO;
  subjects: Omit<ICreateSubjectDTO, 'segment_id'>[];
}

async function create() {
  await AppDataSource.initialize();
  const segmentsRepository = new SegmentsRepository();
  const subjectsRepository = new SubjectsRepository();

  const seeds: ISeed[] = [
    {
      segment: {
        name: 'Infantil',
        phase_name: 'ano',
        starting_phase: 1,
        phases_number: 5,
      },
      subjects: [],
    },
    {
      segment: {
        name: 'Fundamental I',
        phase_name: 'ano',
        starting_phase: 1,
        phases_number: 5,
      },

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
      segment: {
        name: 'Fundamental II',
        phase_name: 'ano',
        starting_phase: 6,
        phases_number: 4,
      },

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
      segment: {
        name: 'Médio',
        phase_name: 'ano',
        starting_phase: 1,
        phases_number: 3,
      },
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
