import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
   const [name, setName] = useState('');

   return (
      <div className="login">
         <div className="form">
            <div className="greetings">Welcome</div>
            <label>Username</label>
            <input type="text" onChange={(e) => setName(e.target.value)} />
            <Link
               onClick={(e) => !name && e.preventDefault()}
               to={`/home?name=${name}`}
            >
               {' '}
               <button>Login</button>
            </Link>
         </div>
      </div>
   );
};

export default Login;
