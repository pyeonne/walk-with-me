import { useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io.connect('http://localhost:4000');

const Test = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '86%',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
      }}
    >
      {!showChat ? (
        <div>
          <h3>채팅 참가하기</h3>
          <input
            type='text'
            placeholder='닉네임'
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type='text'
            placeholder='Room ID ...'
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button style={{ padding: '1rem' }} onClick={joinRoom}>
            채팅방 참가하기
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
};

export default Test;
