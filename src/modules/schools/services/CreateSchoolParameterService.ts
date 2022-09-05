import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSchoolParameterDTO } from '../dtos/ICreateSchoolParameterDTO';
import { ISchoolParametersRepository } from '../repositories/ISchoolParametersRepository';

interface IRequest {
  data: Omit<ICreateSchoolParameterDTO, 'school_id'>;

  school_id: string;
}

@injectable()
class CreateSchoolParameterService {
  constructor(
    @inject('SchoolParametersRepository')
    private schoolParametersRepository: ISchoolParametersRepository,
  ) {}

  public async execute({ data, school_id }: IRequest) {
    if (!school_id) {
      throw new ErrorsApp(
        'O usuário precisa pertencer a uma escola para criar um período do ano',
        403,
      );
    }

    const schoolParameterData = Object.assign(data, { school_id });

    const schoolParameters = await this.schoolParametersRepository.create(
      schoolParameterData,
    );

    return schoolParameters;
  }
}

export { CreateSchoolParameterService };
