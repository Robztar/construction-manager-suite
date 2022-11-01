import React from 'react';
import {Link} from 'react-router-dom';

const Signup = ()=>{
     return (
          <div className="gen-cont">
               <div className="home-cont">
                    <h1 className="welcome-title">Sign-Up Page</h1>
                    <form className='auth-form'>
                         <input className='auth-input' type="text" name="fname" placeholder="First Name" required/> 
                         <br/>
                         <input className='auth-input' type="text" name="lname" placeholder="Last Name" required/> 
                         <br/>
                         <input className='auth-input' type="text" name="email" placeholder="Email" required/> 
                         <br/>
                         <input className='auth-input' type="password" name="pwd" placeholder="Password" required/> 
                         <br/>
                         <input className='auth-input' type="password" name="cpwd" placeholder="Confirm Password" required/> 
                    </form>
                    <Link to="/edit">
                         <button className="auth-btn" type="submit">Sign Up</button>
                    </Link>
                    <Link to="/login">
                         <button className="auth-btn" type="submit">Already have an account?</button>
                    </Link>
               </div>
          </div>
     );
}

export default Signup;