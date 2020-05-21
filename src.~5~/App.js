import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

let socket, user;

const App = () => {
   const [messages, setMessages] = useState([]);
   const [message, setMessage] = useState('');
   // const [seen, setSeen] = useState(true);
   const [users, setUsers] = useState([]);

   useEffect(() => {
      // socket = socketIOClient('/');
      socket = socketIOClient('localhost:5000');
      user = prompt('Tell us your name');

      socket.emit('join', user);

      return () => {
         socket.emit('usrLeave', user);
         socket.off();
      };

   }, []);

   useEffect(() => {
      socket.on('message', (msg) => {
         console.log(msg);
         setMessages([...messages, msg]);
         // setSeen(false);
      });
   }, [messages]);

   useEffect(() => {

      socket.on('init', (usrList) => {
         console.log(usrList);
         setUsers([...users, usrList]);
      });

      socket.on('usrJoin', (usr) => {
         setUsers([...users, usr]);
      });

      socket.on('usrLeave', (usr) => {
         setUsers(delete users[usr]);
      });

   }, [users]);

   const sendMessage = () => {
      message && socket.emit('message', message) && setMessage('');
   };

   return (
      <div>

         {/* {users.map((usr, ind) => ( */}
         {/*    <div key={ind}>{usr}</div> */}
         {/* ))} */}

         {messages.map((msg, ind) => (
            <div key={ind}>{msg}</div>
         ))}

         <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
               if (e.key === 'Enter') {
                  e.preventDefault();
                  sendMessage();
               }
            }}
         />
      </div>
   );
};

export default App;
