import './Home.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import socketIOClient from 'socket.io-client';

let socket;

const Home = ({ location }) => {
   const { name } = queryString.parse(location.search);
   const [users, setUsers] = useState([]);
   const [messages, setMessages] = useState([]);
   const [typing, setTyping] = useState(false);
   const [message, setMessage] = useState('');
   const [seen, setSeen] = useState(true);
   const [seenUsers, setSeenUsers] = useState([]);

   useEffect(() => {
      // socket = socketIOClient('localhost:5000');
      socket = socketIOClient('https://soulfly.herokuapp.com/');

      socket.emit('join', name);

      socket.on('init', (usrList, messages) => {
         setUsers((users) => usrList);
         setMessages((oldMessages) => [
            ...messages,
            { class: 'admin', content: `Welcome to the server ${name}` },
         ]);
      });

      socket.on('usrJoin', (users, name) => {
         setUsers((oldUsers) => users);
         setMessages((oldMessages) => [
            ...oldMessages,
            { class: 'admin', content: `${name} has joined` },
         ]);
      });

      socket.on('message', (message) => {
         setMessages((oldMessages) => [...oldMessages, message]);
         message.id !== socket.id && setSeen(false);
         setSeenUsers((oldSeenUsers) => []);
      });

      socket.on('seen', (name) => {
         setSeenUsers((oldSeenUsers) => [...oldSeenUsers, name]);
      });

      socket.on('typing', () => {
         setTyping(true);
         setTimeout(() => setTyping(false), 1500);
      });

      socket.on('usrLeave', (users, name) => {
         setUsers((oldUsers) => users);
         setMessages((oldMessages) => [
            ...oldMessages,
            { class: 'admin', content: `${name} has left` },
         ]);
      });
   }, []);

   return (
      <div className="home">
         <div className="header">
            <Link to={'/'}>
               <button>Logout</button>
            </Link>
            <div className="title">Soulfly</div>
         </div>

         <div className="body">
            <div className="users">
               {users.map((user, index) => (
                  <div className="user" key={index}>
                     {user}
                  </div>
               ))}
            </div>

            <div className="chats">
               <div className="log">
                  {messages.map((message, index) => {
                     if (message.class === 'admin') {
                        return (
                           <div className={message.class} key={index}>
                              {message.content}
                           </div>
                        );
                     } else {
                        const classType =
                           message.name === name
                              ? 'own-messages'
                              : 'others-messages';
                        return (
                           <div className={classType} key={index}>
                              <b>{message.name}: </b>
                              {message.content}
                           </div>
                        );
                     }
                  })}

                  {seenUsers[0] && (
                     <div className="seen-status">
                        seen by {seenUsers.join(',')}
                     </div>
                  )}

                  {typing && (
                     <div className="typing-status">Someone is typing</div>
                  )}
               </div>

               <input
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={(e) =>
                     !seen && socket.emit('seen', name) && setSeen(true)
                  }
                  value={message}
                  onKeyDown={(e) => {
                     if (e.key === 'Enter') {
                        e.preventDefault();
                        socket.emit('message', {
                           name: name,
                           id: socket.id,
                           content: message,
                        });
                        setMessage('');
                     } else {
                        socket.emit('typing', { id: socket.id, name: name });
                     }
                  }}
               />
            </div>
         </div>
      </div>
   );
};

export default Home;
