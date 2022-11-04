import React from 'react';
import {Link} from 'react-router-dom';

const Dash = ()=>{

     return (
          <div className="gen-cont">
               <div className="dash-cont">
                    <section className='dash-sect'>
                         <h1 className="dash-title">User's Dashboard</h1>
                         <div className='projects-cont'>
                              <Link to="/edit" className='project'>
                                   <div className='proj-thumb main'></div>
                                   <div className='proj-title'>Main Project</div>
                              </Link>
                              <Link to="/test" className='project'>
                                   <div className='proj-thumb test'></div>
                                   <div className='proj-title'>R&D Project</div>
                              </Link>
                         </div>
                    </section>
               </div>
          </div>
     );
}

export default Dash;