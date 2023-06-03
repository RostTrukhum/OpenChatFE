import { Routes, Route, HashRouter } from 'react-router-dom';
import { Home } from '../home/Home';
import * as io from 'socket.io-client';
import { ChatPage } from '../chat-page/ChatPage';
import { useEffect, useState } from 'react';

const socket = io.connect('https://openchat-c7tw.onrender.com/');

export const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('userName'));
  }, []);

  window.addEventListener('storage', () => {
    setIsLoggedIn(!!localStorage.getItem('userName'));
  });

  return (
    <HashRouter>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <ChatPage socket={socket} />
              ) : (
                <Home socket={socket} />
              )
            }></Route>
          <Route
            path="/chat"
            element={
              isLoggedIn ? (
                <ChatPage socket={socket} />
              ) : (
                <Home socket={socket} />
              )
            }></Route>
        </Routes>
      </div>
    </HashRouter>
  );
};
