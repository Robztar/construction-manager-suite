import React from 'react';
import {Link} from 'react-router-dom';

const Home = ()=>{

     return (
          <div className="gen-cont">
               <div className="home-cont">
                    <h1 className="welcome-title">Welcome to <br/> <span>GroundUp</span> <br/> House Designer </h1>
                    <section className='btn-cont'>
                         <Link to="/signup">
                              <button className="op-btn" type="submit">Sign Up</button>
                         </Link>
                         <Link to="/login">
                              <button className="op-btn" type="submit">Log In</button>
                         </Link>
                         <Link to="/dash">
                              <button className="op-btn" type="submit">Enter Now</button>
                         </Link>
                    </section>
               </div>
          </div>
     );
}

export default Home;