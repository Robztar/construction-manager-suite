import React from 'react';
import {Link} from 'react-router-dom';

const Login = ()=>{
     return (
          <div className="gen-cont">
               <div className="home-cont">
                    <h1 className="welcome-title">Log-In Page</h1>
                    <form className="auth-form">
                         <input className='auth-input' type="text" name="email" placeholder="Email" required/> 
                         <br/>
                         <input className='auth-input' type="password" name="pwd" placeholder="Password" required/> 
                    </form>
                    <Link to="/edit">
                         <button className="auth-btn" type="submit">Log In</button>
                    </Link>
                    <Link to="/signup">
                         <button className="auth-btn" type="submit">Don't have an account?</button>
                    </Link>
               </div>
          </div>
     );
}

export default Login;