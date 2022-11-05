import { IAddress } from '@modules/addresses/models/IAddress';
import { Person } from '@modules/persons/infra/typeorm/models/Person';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('smsystem.addresses')
class Address implements IAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Person, person => person.addresses)
  @JoinTable({
    name: 'smsystem.person_addresses',
    joinColumn: {
      name: 'address_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'person_id',
      referencedColumnName: 'id',
    },
  })
  persons: Person[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Address };
