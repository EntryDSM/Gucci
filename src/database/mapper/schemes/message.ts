export interface Message {
  writer: string;
  room: string;
  content?: string;
  encodedImageData?: string;
  sendedAt: number;
  isAdmin: boolean;
}
