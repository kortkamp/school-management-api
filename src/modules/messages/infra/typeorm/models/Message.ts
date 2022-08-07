import { IMessage, MessageType } from '@modules/messages/models/IMessage';
import { User } from '@modules/users/infra/typeorm/models/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('messages')
class Message implements IMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: MessageType })
  type: MessageType;

  @Column()
  user_id: string;

  @Column()
  sender_id: string;

  @Column()
  school_id: string;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column()
  link: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, sender => sender)
  @JoinColumn({ name: 'sender_id', referencedColumnName: 'id' })
  sender: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Message };
