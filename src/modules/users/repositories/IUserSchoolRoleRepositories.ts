import { IUserSchoolRole } from '../models/IUserSchoolRole';

interface IUserSchoolRoleRepositories {
  getByUserSchool(
    user_id: string,
    school_id: string,
  ): Promise<IUserSchoolRole[]>;
}

export { IUserSchoolRoleRepositories };
