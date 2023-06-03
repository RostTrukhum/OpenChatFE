import React, { useEffect, useState } from 'react';
import { ISocket } from '../../types';

export const ChatFooter = ({ socket }: ISocket) => {
  const [message, setMessage] = useState('');

  const handleTyping = () => {
    socket.emit('typing', `${localStorage.getItem('userName')} is typing`);
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };

  useEffect(() => {
    if (!message) {
      socket.emit('typing', ``);
    }
  }, [message]);

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onInput={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};
