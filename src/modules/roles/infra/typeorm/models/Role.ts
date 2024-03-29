import { IRole, RoleTypes } from '@modules/roles/models/IRole';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('roles')
class Role implements IRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: RoleTypes })
  type: RoleTypes;

  @Column()
  name: string;

  @Column()
  is_employee: boolean;

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

export { Role };
