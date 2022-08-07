export enum MessageType {
  STANDARD = 'standard',
  URGENT = 'urgent',
  MANDATORY = 'mandatory',
  SYSTEM = 'system',
}

interface IMessage {
  id: string;

  user_id: string;

  sender_id: string | undefined;

  school_id: string | undefined;

  type: MessageType;

  title: string;

  text: string;

  link: string;

  created_at: Date;
}

export type { IMessage };
