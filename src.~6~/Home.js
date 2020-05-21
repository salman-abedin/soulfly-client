import './Home.css';
import React, {useState,useEffect} from 'react';
import queryString from 'query-string';

const Home = ( {location} ) => {
   
   const [uName, setName] = useState('')

   useEffect( () => {
      const {name} = queryString.parse(location.search)
      setName(name)
   }, [location.search])

   return (
      <div className="home">
         <div className="header">Soulfly </div>

         <div className="body">
            <div className="users">
               <div className="user">gulzer</div>
               <div className="user">saadman</div>
               <div className="user">salman</div>
            </div>

            <div className="chats">
               <div className="log">
                  <div className="admin">Welcome to the server {uName}</div>

                  <div className="own-messages">
                     <b>salman: </b>
                     Hey there
                  </div>

                  <div className="seen-status">seen by saadman</div>

                  <div className="others-messages">
                     <b>saadman: </b>
                     Hi brother
                  </div>

                  <div className="typing-status">saadman is typing</div>

                  <div className="admin">Saadman has left</div>
               </div>
               <input />
            </div>
         </div>
      </div>
   );
};

export default Home;
