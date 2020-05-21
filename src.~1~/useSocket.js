import socketIOClient from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';

const useSocket = () => {
   const [typingUsrs, setTypingUsrs] = useState([]);
   const [messages, setMessages] = useState([]);
   const [seenState, setSeen] = useState(true);
   const [seenUsrs, setSeenUsrs] = useState([]);

   const socketRef = useRef();

   const usr = prompt('Tell us your name')

   useEffect(() => {

      // setUsr(prompt('Tell us your name'))

      socketRef.current = socketIOClient('http://localhost:5000');

      socketRef.current.on('typing', usr => {
         setTypingUsrs(typingUsrs => [ ...typingUsrs, usr ])
         // console.log(`${usr} is typing`)
      })

      socketRef.current.on('message', msg => {
         setMessages(messages => [...messages, msg ])
         setSeen(false)
      })

      socketRef.current.on('seen', usr => {
         setSeenUsrs( seenUsrs => [ ...seenUsrs, usr ] )
         // console.log(`seen by ${usr}`)
      })

      return () => {
         socketRef.current.disconnect();
      };
   }, []);

   const typing = () => {
      socketRef.current.emit('typing', usr);
   };

   const send = msg => {
      socketRef.current.emit('message', msg, usr);
   };

   const seen = usr => {
      !seenState && socketRef.current.emit('seen', usr) && setSeen(true)
   };

   return { messages, send, typing, seen };

};

export default useSocket;
