import React from 'react';
import Input from './Input';
import Messages from './Messages';
import Users from './Users';
import useSocket from './useSocket';

const App = () => {
   const { messages, send, typing, seen, } = useSocket();

   return (
      <div>
         <Users />
         <Messages messages={messages} />
         <Input onSendMessage={msg => send(msg)} onInput={typing} onFocus={seen}/>
      </div>
   );
};

export default App;
