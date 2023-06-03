import React, { useEffect, useRef, useState } from 'react';
import { ChatBar } from '../../components/chat-bar/ChatBar';
import ChatBody from '../../components/chat-body/ChatBody';
import { ChatFooter } from '../../components/chat-footer/ChatFooter';
import { IMessage, ISocket } from '../../types';

export const ChatPage = ({ socket }: ISocket) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on('messageResponse', (data: IMessage) =>
      setMessages([...messages, data]),
    );
  }, [socket, messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    socket.on('typingResponse', (data: string) => setTypingStatus(data));
  }, [socket]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};
