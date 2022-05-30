interface ICreateUserDTO {
  email: string;
  name: string;
  role_id: string;
  password: string;
  active?: boolean;
  segment_id?: string;
  grade_id?: string;
  class_group_id?: string;
}

export { ICreateUserDTO };
