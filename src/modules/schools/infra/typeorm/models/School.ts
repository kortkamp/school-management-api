import { Address } from '@modules/addresses/infra/typeorm/models/Address';
import { ISchool } from '@modules/schools/models/ISchool';
import { SchoolYear } from '@modules/schoolYears/infra/typeorm/models/SchoolYear';
import { UserSchoolRole } from '@modules/users/infra/typeorm/models/UserSchoolRole';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { SchoolParameter } from './SchoolParameter';

@Entity('schools')
class School implements ISchool {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  full_name: string;

  @Column()
  CNPJ: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  mobile: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  CEP: string;

  @Column()
  active_year_id: string;

  @OneToOne(() => SchoolYear, schoolYear => schoolYear)
  @JoinColumn({ name: 'active_year_id', referencedColumnName: 'id' })
  school_year: SchoolYear;

  @OneToMany(type => UserSchoolRole, userSchoolRole => userSchoolRole.school, {
    cascade: ['insert'],
  })
  @JoinColumn({ name: 'id' })
  userSchoolRoles: UserSchoolRole[];

  @OneToOne(() => SchoolParameter, schoolParameter => schoolParameter.school)
  parameters: SchoolParameter;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { School };
