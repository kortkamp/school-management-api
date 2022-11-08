import { Address } from '@modules/addresses/infra/typeorm/models/Address';
import { Contact } from '@modules/contacts/infra/typeorm/models/Contact';
import { IPerson } from '@modules/persons/models/IPerson';
import { Student } from '@modules/students/infra/typeorm/models/Student';
import { User } from '@modules/users/infra/typeorm/models/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('smsystem.persons')
class Person implements IPerson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cpf?: string;

  @Column()
  rg: string;

  @Column()
  sex: 'M' | 'F';

  @Column()
  birth: Date;

  @Column()
  active: boolean;

  @Column()
  tenant_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Address, address => address.persons, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({
    schema: 'smsystem',
    name: 'person_addresses',
    joinColumn: {
      name: 'person_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'address_id',
      referencedColumnName: 'id',
    },
  })
  addresses: Address[];

  @OneToOne(() => Contact, contact => contact.person, {
    cascade: ['insert', 'update'],
  })
  contact: Contact;

  @OneToOne(() => User, user => user.person, { cascade: ['insert'] })
  user: User;

  @OneToOne(() => Student, student => student.person, { cascade: ['insert'] })
  student: Student;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Person };
