import { ICreateClassGroupDTO } from '@modules/classGroups/dtos/ICreateClassGroupDTO';
import { ClassGroupsRepository } from '@modules/classGroups/infra/typeorm/repositories/ClassGroupsRepository';
import { ICreateGradeDTO } from '@modules/grades/dtos/ICreateGradeDTO';
import { GradesRepository } from '@modules/grades/infra/typeorm/repositories/GradesRepository';
import { DayTime } from '@modules/routines/models/IRoutine';
import { ICreateSegmentDTO } from '@modules/segments/dtos/ICreateSegmentDTO';
import { SegmentsRepository } from '@modules/segments/infra/typeorm/repositories/SegmentsRepository';
import { ICreateStudentDTO } from '@modules/students/dtos/ICreateStudentDTO';
import { ICreateSubjectDTO } from '@modules/subjects/dtos/ICreateSubjectDTO';
import { SubjectsRepository } from '@modules/subjects/infra/typeorm/repositories/SubjectsRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

import 'dotenv/config';
import { AppDataSource } from '..';

interface ISeed {
  segment: { name: string; nick: string };
  grades: { name: string; nick: string }[];
}

async function create() {
  let enroll_increment = 1000;

  const getEnrollId = () => {
    enroll_increment += 1;
    return enroll_increment;
  };

  await AppDataSource.initialize();
  const segmentsRepository = new SegmentsRepository();
  const gradesRepository = new GradesRepository();
  const classGroupsRepository = new ClassGroupsRepository();
  const studentsRepository = new UsersRepository();

  const seeds: ISeed[] = [
    {
      segment: { name: 'Infantil', nick: 'Inf' },
      grades: [
        {
          name: 'Infantil 1',
          nick: 'Inf1_',
        },
        {
          name: 'Infantil 2',
          nick: 'Inf2_',
        },
        {
          name: 'Infantil 3',
          nick: 'Inf3_',
        },
        {
          name: 'Infantil 4',
          nick: 'Inf4_',
        },
      ],
    },
    {
      segment: { name: 'Fundamental I', nick: 'FunI' },
      grades: [
        {
          name: '1º Ano',
          nick: '10',
        },
        {
          name: '2º Ano',
          nick: '20',
        },
        {
          name: '3º Ano',
          nick: '30',
        },
        {
          name: '4º Ano',
          nick: '40',
        },
      ],
    },
    {
      segment: { name: 'Fundamental II', nick: 'FunII' },
      grades: [
        {
          name: '5º Ano',
          nick: '50',
        },
        {
          name: '6º Ano',
          nick: '60',
        },
        {
          name: '7º Ano',
          nick: '70',
        },
        {
          name: '8º Ano',
          nick: '80',
        },
        {
          name: '9º Ano',
          nick: '90',
        },
      ],
    },
    {
      segment: { name: 'Médio', nick: 'Med' },
      grades: [
        {
          name: '1º Ano',
          nick: '100',
        },
        {
          name: '2º Ano',
          nick: '200',
        },
        {
          name: '3º Ano',
          nick: '300',
        },
      ],
    },
  ];

  const school_id = '2758badb-0423-4681-83e1-08f959e6e96d';

  const student_role_id = '54b94217-86c4-4601-b54c-c5f8ae21e25b';

  const classGroupsSufix = ['1', '2', '3'];
  const studentsSufix = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  const createSeeds = seeds.map(async seed => {
    const segment = await segmentsRepository.findByName(seed.segment.name);

    const createGrades = seed.grades.map(async grade => {
      // TODO add where segment_id
      const foundGrade = await gradesRepository.findByName(grade.name);

      const createClassGroups = classGroupsSufix.map(async sufix => {
        const classGroupName = grade.nick + sufix;
        const classGroup = await classGroupsRepository.create({
          grade_id: foundGrade.id,
          name: classGroupName,
          school_id,
          day_time: DayTime.MORNING,
        });
        const createStudents = studentsSufix.map(async studentSufix => {
          const studentName = `Student_${classGroupName}_${studentSufix}`;
          await studentsRepository.create({
            name: studentName,
            birth: new Date(),
            sex: 'M',
            role_id: student_role_id,
            segment_id: segment.id,
            grade_id: foundGrade.id,
            class_group_id: classGroup.id,
            enroll_id: String(getEnrollId()),
          });
        });
        await Promise.all(createStudents);
      });
      await Promise.all(createClassGroups);
    });
    await Promise.all(createGrades);
  });

  await Promise.all(createSeeds);

  await AppDataSource.destroy();
}

create().then(() => console.log('Logs!'));
