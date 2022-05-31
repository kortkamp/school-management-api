interface ICreateFilteredModuleDTO {
  type: string;

  value: number;

  weight: number;

  teacher_id: string;

  subject_id: string;

  class_id: string;

  date: Date;
}

export { ICreateFilteredModuleDTO };
