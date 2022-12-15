import React from 'react';
import {Link} from 'react-router-dom';

import { GenNav } from '../components/html/GenNav';

const About = ()=>{

     return (
          <div className="about-cont">
               <GenNav />
               <section className="about-sect">
                    <h1 className="about-title">About <br/> <span>GroundUp</span> <br/> House Designer </h1>
                    <div className='about-btn-cont'>
                         <Link to="/dash">
                              <button className="about-start-btn" type="submit">Enter Now</button>
                         </Link>
                    </div>
               </section>
               <section className="about-sect">
                    <h1 className="about-title">Objective</h1>
               </section>
          </div>
     );
}

export default About;