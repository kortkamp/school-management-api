import { ICreateTermDTO } from '@modules/terms/dtos/ICreateTermDTO';
import { TermType } from '@modules/terms/models/ITerm';
import { ITermsRepository } from '@modules/terms/repositories/ITermsRepository';
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

    @inject('TermsRepository')
    private termsRepository: ITermsRepository,
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

    // create terms
    const termsData: ICreateTermDTO[] = [];

    for (let i = 1; i <= schoolParameters.term_number; i += 1) {
      const term: ICreateTermDTO = {
        school_id,
        name: `${i}º ${schoolParameters.term_period}`,
        type: TermType.STANDARD,
        start_at: new Date(),
        end_at: new Date(),
      };
      termsData.push(term);
    }

    await this.termsRepository.create(termsData);

    return schoolParameters;
  }
}

export { CreateSchoolParameterService };
