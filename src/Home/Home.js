import './Home.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import socketIOClient from 'socket.io-client';

let socket;

const Home = ({ location }) => {
   const [messages, setMessages] = useState([]);
   const [message, setMessage] = useState('');
   const [seen, setSeen] = useState(true);
   const [seenUsers, setSeenUsers] = useState([]);
   const [users, setUsers] = useState([]);
   const { name } = queryString.parse(location.search);

   const [typingUsers, setTypingUsers] = useState({});

   useEffect(() => {
      socket = socketIOClient('localhost:5000');

      socket.emit('join', name);

      socket.on('init', (usrList) => {
         setUsers((users) => usrList);
         setMessages((oldMessages) => [
            ...oldMessages,
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

      //TODO
      socket.on('typing', ({id, name}) => {
         setTypingUsers((oldTypingUsers) => {
            oldTypingUsers[id] = name

            // setTimeout(() => {
            //    delete oldTypingUsers[id]
            // }, 3000)

            return oldTypingUsers
         });
      });

      // socket.on('typingStopped', ({id, name}) => {
      //    setTypingUsers((oldTypingUsers) => {
      //       delete oldTypingUsers[id]
      //       return oldTypingUsers
      //    });
      // });

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
                  {/* <div className="seen-status">seen by saadman</div> */}

                  {/* <div className="typing-status">saadman is typing</div> */}

                  {messages.map((message, index) => {
                     if (message.class === 'admin') {
                        return (
                           <div className={message.class} key={index}>
                              {message.content}
                           </div>
                        );
                     } else {
                        const classType =
                           message.id === socket.id
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

                  {Object.values(typingUsers)[0] && (
                     <div className="typing-status">
                        Being typed by {Object.values(typingUsers).join(',')}
                     </div>
                  )}
               </div>

               <input
                  onChange={(e) => setMessage(e.target.value)}
                  // onInput={(e) => socket.emit('typing', { id: socket.id, name: name })}
                  // onKeyUp={(e) => socket.emit('typingStopped', { id: socket.id, name: name })}
                  onFocus={(e) => !seen && socket.emit('seen', name) && setSeen(true) }
                  value={message}
                  onKeyDown={(e) => {

                     //TODO
                     socket.emit('typing', { id: socket.id, name: name })

                     if (e.key === 'Enter') {
                        e.preventDefault();
                        socket.emit('message', {
                           name: name,
                           id: socket.id,
                           content: message,
                        });
                        setMessage('');
                     }
                  }}
               />
            </div>
         </div>
      </div>
   );
};

export default Home;
