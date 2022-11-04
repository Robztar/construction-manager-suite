import React from 'react';
import {Link} from 'react-router-dom';

const Dash = ()=>{

     return (
          <div className="gen-cont">
               <div className="dash-cont">
                    <h1 className="dash-title">User's Dashboard</h1>
                    <section className='projects-cont'>
                         <Link to="/edit">
                              {/* <button className="enter-btn" type="submit">Enter Now</button> */}
                              <div className='project'>
                                   <div className='proj-thumb main'></div>
                                   <div className='proj-title'>Main Project</div>
                              </div>
                         </Link>
                         <Link to="/test">
                              {/* <button className="enter-btn" type="submit">Test Mode</button> */}
                              <div className='project'>
                                   <div className='proj-thumb test'></div>
                                   <div className='proj-title'>R&D Project</div>
                              </div>
                         </Link>
                    </section>
                    
               </div>
          </div>
     );
}

export default Dash;