import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

const Messages = ({ messages }) => {


   return (
      <List>
         {messages.map((message, index) => 
            <ListItem alignItems="flex-start" key={index}>
               <ListItemAvatar>
                  <Avatar
                     alt="Cute Kitten"
                     src="http://placekitten.com/200/200"
                  />
               </ListItemAvatar>
               <ListItemText primary={message} />
            </ListItem>,
         )}
      </List>
   );

};

export default Messages;
