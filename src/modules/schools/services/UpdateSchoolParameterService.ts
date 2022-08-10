import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSchoolParameterDTO } from '../dtos/ICreateSchoolParameterDTO';
import { ISchoolParametersRepository } from '../repositories/ISchoolParametersRepository';

interface IRequest {
  school_id: string;
  schoolParameterId: string;
  data: Partial<ICreateSchoolParameterDTO>;
}

@injectable()
class UpdateSchoolParameterService {
  constructor(
    @inject('SchoolParametersRepository')
    private schoolParametersRepository: ISchoolParametersRepository,
  ) {}
  public async execute({ schoolParameterId, data, school_id }: IRequest) {
    if (!school_id) {
      throw new ErrorsApp(
        'O usuário precisa pertencer a uma escola para criar um período do ano',
        403,
      );
    }

    const schoolParameter = await this.schoolParametersRepository.findById(schoolParameterId, school_id);

    if (!schoolParameter) {
      throw new ErrorsApp('SchoolParameter not found', 404);
    }

    if (data.name && data.name !== schoolParameter.name) {
      const schoolParameterExists = await this.schoolParametersRepository.findByName(data.name);

      if (schoolParameterExists) {
        throw new ErrorsApp('SchoolParameter name already exists', 409);
      }
    }

    Object.assign(schoolParameter, data);

    await this.schoolParametersRepository.save(schoolParameter);

    return schoolParameter;
  }
}

export { UpdateSchoolParameterService };
