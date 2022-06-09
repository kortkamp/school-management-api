interface ICreateStudentDTO {
  email?: string;
  name: string;
  enroll_id: string; // unique
  CPF?: string; // unique
  phone?: string;
  sex: 'M' | 'F';
  birth: Date;
  role_id: string;
  password?: string;
  active?: boolean;
  segment_id?: string;
  grade_id?: string;
  class_group_id?: string;
}

export { ICreateStudentDTO };
