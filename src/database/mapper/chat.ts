import { Db, Collection, ObjectId } from 'mongodb';
import { Message } from './schemes/message';
import { MessageThread } from './schemes/messageThread';

export class ChatMapper {
  private collections: {
    [room: string]: Collection<Message>;
  } = {};
  private messageThreadCollection: Collection<MessageThread>;

  constructor(private db: Db) {
    this.messageThreadCollection = this.db.collection('messageThreads');
  }

  updateMessageThread = async (messageThread: MessageThread) => {
    if (
      !(await this.messageThreadCollection.findOne({
        room: messageThread.room,
      }))
    ) {
      this.messageThreadCollection.insertOne(messageThread);
    }
  }

  registerMessage = async (message: Message): Promise<ObjectId> => {
    if (!this.collections[message.room]) {
      const collection = this.db.collection(message.room);
      this.collections[message.room] = collection;
    }
    const { insertedId } = await this.collections[message.room].insertOne(
      message,
    );
    this.updateMessageThread({ room: message.room, latestMessage: message });
    return insertedId;
  }

  findMessagesByRoom = async (
    room: string,
    startMillisecond: number,
    limit: number,
  ): Promise<Message[]> => {
    const collection = this.db.collection<Message>(room);
    return await collection
      .find({ sendedAt: { $lt: startMillisecond } })
      .sort({ sendedAt: -1 })
      .limit(limit)
      .toArray();
  }

  findRooms = async (
    startMillisecond: number,
    limit: number,
  ): Promise<MessageThread[]> => {
    return await this.messageThreadCollection
      .find({ 'latestMessage.sendedAt': { $lt: startMillisecond } })
      .sort({ sendedAt: -1 })
      .limit(limit)
      .toArray();
  }
}
