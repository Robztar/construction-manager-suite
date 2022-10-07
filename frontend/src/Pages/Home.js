import React from 'react';
import {Link} from 'react-router-dom';

const Home = ()=>{

     return (
          <div className="gen-cont">
               <div className="home-cont">
                    <h1 className="welcome-title">Welcome to Your <span>Construction Manager</span></h1>
                    <section>
                         <Link to="/signup">
                              <button className="auth-btn" type="submit">Sign Up</button>
                         </Link>
                         <Link to="/login">
                              <button className="auth-btn" type="submit">Log In</button>
                         </Link>
                    </section>
                    <section>
                         <Link to="/edit">
                              <button className="enter-btn" type="submit">Enter Now</button>
                         </Link>
                         <Link to="/test">
                              <button className="enter-btn" type="submit">Test Mode</button>
                         </Link>
                    </section>
                    
               </div>
          </div>
     );
}

export default Home;