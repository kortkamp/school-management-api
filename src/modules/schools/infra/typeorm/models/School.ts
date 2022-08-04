import { Address } from '@modules/addresses/infra/typeorm/models/Address';
import { ISchool } from '@modules/schools/models/ISchool';
import { UserSchoolRole } from '@modules/users/infra/typeorm/models/UserSchoolRole';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('schools')
class School implements ISchool {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  CNPJ: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  mobile: string;

  @Column()
  address_id: string;

  @ManyToOne(() => Address, address => address, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address?: Address;

  @OneToMany(type => UserSchoolRole, userSchoolRole => userSchoolRole.school, {
    cascade: ['insert'],
  })
  @JoinColumn({ name: 'id' })
  userSchoolRoles: UserSchoolRole[];

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
