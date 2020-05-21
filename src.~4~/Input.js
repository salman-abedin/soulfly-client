import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

const Input = ({
   onSendMessage: pushSendMessage,
   onInput: showTyping,
   onFocus: showSeen,
}) => {
   const [message, setMessage] = useState('');

   return (
      <div>
         <TextField
            fullWidth
            label="Message"
            margin="normal"
            multiline
            variant="filled"
            value={message}
            onChange={e => setMessage(e.target.value)}
            //TODO
            onInput={e => showTyping()}
            //TODO
            onFocus={e => showSeen()}
            //TODO
            onKeyDown={e => {
               // showTyping()
               if (e.key === 'Enter') {
                  e.preventDefault();
                  pushSendMessage(message);
                  setMessage('');
               }
            }}
         />
      </div>
   );
};

export default Input;
