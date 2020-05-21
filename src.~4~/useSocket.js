import socketIOClient from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';

const useSocket = () => {
   const [messages, setMessages] = useState([]);
   const [seenState, setSeen] = useState(true);
   const [usr, setUsr] = useState('');

   const socketRef = useRef();

   useEffect(() => {
      setUsr(prompt('Tell us your name'))
      socketRef.current = socketIOClient('http://localhost:5000');

      socketRef.current.on('typing', usr => {
         console.log(`${usr} is typing`)
      })

      socketRef.current.on('message', msg => {
         setMessages(messages => [...messages, msg ])
         setSeen(false)
      })

      socketRef.current.on('seen', usr => {
         console.log(`seen by ${usr}`)
      })

      return () => {
         socketRef.current.disconnect();
      };
   }, []);

   const typing = () => {
      socketRef.current.emit('typing', usr);
   };

   const send = msg => {
      socketRef.current.emit('message', msg);
   };

   const seen = () => {
      !seenState && socketRef.current.emit('seen') && setSeen(true)
   };

   return { messages, send, typing, seen };

};

export default useSocket;
