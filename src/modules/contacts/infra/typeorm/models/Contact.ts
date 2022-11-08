import { IContact } from '@modules/contacts/models/IContact';
import { Person } from '@modules/persons/infra/typeorm/models/Person';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('smsystem.contacts')
class Contact implements IContact {
  @PrimaryColumn()
  person_id: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  cel_phone: string;

  @Column()
  tenant_id: string;

  @OneToOne(() => Person, person => person)
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: Person;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Contact };
