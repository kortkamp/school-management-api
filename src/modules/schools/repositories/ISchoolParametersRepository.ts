import { ICreateSchoolParameterDTO } from '../dtos/ICreateSchoolParameterDTO';
import { ISchoolParameter } from '../models/ISchoolParameter';

interface ISchoolParametersRepository {
  create(
    schoolParameters: ICreateSchoolParameterDTO,
  ): Promise<ISchoolParameter[]>;
  findBySchoolId(school_id: string): Promise<ISchoolParameter | undefined>;
  save(dataUpdate: ISchoolParameter): Promise<void>;
}

export { ISchoolParametersRepository };
