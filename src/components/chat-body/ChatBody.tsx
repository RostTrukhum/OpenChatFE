import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IMessage } from '../../types';

interface IProps {
  messages: IMessage[];
  typingStatus: string;
  lastMessageRef: React.LegacyRef<HTMLDivElement>;
}

const ChatBody = ({ messages, lastMessageRef, typingStatus }: IProps) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {/*This shows messages sent from you*/}
        {messages.map(message =>
          message.name === localStorage.getItem('userName') ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          ),
        )}
        <div ref={lastMessageRef} />

        {/*This is triggered when a user is typing*/}
        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;
