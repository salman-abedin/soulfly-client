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
            onChange={(evt) => setMessage(evt.target.value)}
            //TODO
            onInput={(evt) => showTyping()}
            //TODO
            onFocus={(evt) => showSeen()}
            //TODO
            onKeyDown={(evt) => {
               // showTyping()
               if (evt.key === 'Enter') {
                  evt.preventDefault();
                  pushSendMessage(message);
                  setMessage('');
               }
            }}
         />
      </div>
   );
};

export default Input;
