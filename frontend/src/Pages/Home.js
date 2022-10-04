import React from 'react';
import {Link} from 'react-router-dom';

const Home = ()=>{

     return (
          <div className="gen-cont">
               <div className="home-cont">
                    <h1 className="welcome-title">Welcome to Your <span>Construction Manager</span></h1>
                    
                    <Link to="/edit">
                              <button className="enter-btn" type="submit">Enter Now</button>
                    </Link>
               </div>
          </div>
     );
}

export default Home;