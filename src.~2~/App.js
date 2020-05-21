import Input from './Input';
import Messages from './Messages';
import React,{ useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';

const App = () => {

   const [messages, setMessages] = useState([]);
   const [seen, setSeen] = useState(true);

   const socketRef = useRef();

   useEffect(() => {
      const uName = prompt('Tell us your name')
      socketRef.current = socketIOClient('http://localhost:5000');

      socketRef.current.on('message', msg => {
         setMessages(messages => [...messages, msg ])
         setSeen(false)
      })

      socketRef.current.on('seen', data => {
         setMessages(messages => [...messages, 'message seen' ])
      })

      return () => {
         socketRef.current.disconnect();
      };
   }, []);

   const typing = data => {
      socketRef.current.emit('typing');
   };

   const send = msg => {
      socketRef.current.emit('message', msg);
   };

   const saw = () => {
      !seen && socketRef.current.emit('seen') && setSeen(true)
      // socketRef.current.emit('seen')
   };

   return (
      <div>
         <Messages messages={messages} />
         <Input onSendMessage={msg => send(msg)} onInput={typing} onFocus={saw}/>
      </div>
   );

};

export default App;
