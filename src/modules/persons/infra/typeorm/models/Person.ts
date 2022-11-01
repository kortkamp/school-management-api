import { IPerson } from '@modules/persons/models/IPerson';
import { User } from '@modules/users/infra/typeorm/models/User';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @OneToOne(() => User, user => user.person, { cascade: ['insert'] })
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Person };
