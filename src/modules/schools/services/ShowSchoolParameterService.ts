import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ISchoolParametersRepository } from '../repositories/ISchoolParametersRepository';

@injectable()
class ShowSchoolParameterService {
  constructor(
    @inject('SchoolParametersRepository')
    private schoolParametersRepository: ISchoolParametersRepository,
  ) {}
  public async execute(schoolParameterId: string) {
    const schoolParameter =
      await this.schoolParametersRepository.findBySchoolId(schoolParameterId);
    if (!schoolParameter) {
      throw new ErrorsApp('Parâmetros de funcionamento não cadastrados', 404);
    }

    return schoolParameter;
  }
}

export { ShowSchoolParameterService };
