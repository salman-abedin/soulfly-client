import React from 'react';

const Login = () => {
   return (
      <div className="centered-form">
         <div className="centered-form__box">
            <h1>Join</h1>
            <form action="">
               <label>Display name</label>
               <input
                  type="text"
                  name="username"
                  placeholder="What should we call you?"
                  required
               />
            </form>
         </div>
      </div>
   );
};

export default Login;
