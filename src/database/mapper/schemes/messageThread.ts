import { Message } from './message';

export interface MessageThread {
  room: string;
  latestMessage: Message;
}
