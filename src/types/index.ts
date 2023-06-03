import * as io from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

export interface IMessage {
  text: string;
  name: string;
  id: string;
  socketID: string;
}

export interface ISocket {
  socket: io.Socket<DefaultEventsMap, DefaultEventsMap>;
}
