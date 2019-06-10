export interface Message {
  _id: string;
  writer: string;
  room: string;
  content?: string;
  encodedImageData?: string;
  sendedAt: number;
  isAdmin: boolean;
}
