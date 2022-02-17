import React, { useEffect, useState } from 'react';
import './Chat.css';
import ScrollToBottom from 'react-scroll-to-bottom';
const Chat = ({ socket, username, room }) => {
  const [currMesaage, setCurrMEssage] = useState('');
  const [messageList, setMessageList] = useState([]);
  /*
    emit : 데이터 전송 (서버-> 클라이언트 / 클라이언트  -> 서버)
    on :데이터를 받는다 (서버-> 클라이언트 / 클라이언트 -> 서버)
  */
  const sendMessage = async () => {
    if (currMesaage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currMesaage,
        time: `${new Date(Date.now()).getHours()}:${new Date(
          Date.now()
        ).getMinutes()}`,
      };
      // 클라에서 서버로 메세지 보냄
      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrMEssage('');
    }
  };

  useEffect(() => {
    // 서버에서 메세지 받음
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>
      <div className='chat-body'>
        <ScrollToBottom className='message-container'>
          {messageList.map((messageContent) => {
            return (
              <div
                className='message'
                id={username === messageContent.author ? 'you' : 'other'}
              >
                <div>
                  <div className='message-content'>
                    <p>{messageContent.message}</p>
                  </div>
                  <div className='message-meta'>
                    <p id='time'>{messageContent.time}</p>
                    <p id='author'>{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input
          type='text'
          placeholder='message'
          value={currMesaage}
          onChange={(event) => {
            setCurrMEssage(event.target.value);
          }}
          // 엔터 눌렀을때 클릭처럼 인풋 보내짐
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
