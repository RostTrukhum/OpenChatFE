import { useEffect, useState } from 'react';
import { ISocket } from '../../types';
import { IUser } from './types';

export const ChatBar = ({ socket }: ISocket) => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    socket.on('newUserResponse', (data: IUser[]) => setUsers(data));
  }, [socket, users]);

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map(user => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
