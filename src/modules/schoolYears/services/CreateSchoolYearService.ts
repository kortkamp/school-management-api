import { ISchoolsRepository } from '@modules/schools/repositories/ISchoolsRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSchoolYearDTO } from '../dtos/ICreateSchoolYearDTO';
import { ISchoolYearsRepository } from '../repositories/ISchoolYearsRepository';

interface IRequest {
  school_id: string;
  data: Omit<ICreateSchoolYearDTO, 'school_id' | 'active'>;
}

@injectable()
class CreateSchoolYearService {
  constructor(
    @inject('SchoolYearsRepository')
    private schoolYearsRepository: ISchoolYearsRepository,

    @inject('SchoolsRepository')
    private schoolsRepository: ISchoolsRepository,
  ) {}

  public async execute({ data, school_id }: IRequest) {
    const school = await this.schoolsRepository.findById(school_id);

    if (!school) {
      throw new ErrorsApp('Nenhuma escola associada a este usuário', 400);
    }

    if (school.active_year_id) {
      throw new ErrorsApp('A escola já possui um ano letivo em andamento', 409);
    }

    const schoolYearExists = await this.schoolYearsRepository.findByName(
      data.name,
      school_id,
    );

    if (schoolYearExists) {
      throw new ErrorsApp('O ano escolar já existe', 409);
    }

    const schoolYear = await this.schoolYearsRepository.create({
      ...data,
      school_id,
      active: true,
    });

    school.active_year_id = schoolYear.id;

    await this.schoolsRepository.save(school);

    return schoolYear;
  }
}

export { CreateSchoolYearService };
