import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/GroundUp-Logo.png';

import { GenNav } from '../components/html/GenNav';

const Home = ()=>{

     return (
          <div className="gen-cont">
               {/* <GenNav /> */}
               {/* <div className='home-cont'> */}
                    <section className="home-sect">
                         <div className='home-head'>
                              <img alt='logo' src={logo} className='home-logo-img' />
                              <p className="welcome-title"><span>GroundUp</span> <br/> House Designer </p>
                         </div>
                         <div className='home-info'>
                              <div className='home-data'>
                                   Design your dream home and see what
                                   it takes to make it a reality.
                              </div>
                              <div className='info-btn-cont'>
                                   <a href='#app-details' className='info-btn details-btn'>Details</a>
                                   <Link to="/dash" className="info-btn op-btn">
                                        Start Now
                                   </Link>
                              </div>
                         </div>
                    </section>
                    <section className="home-sect" id='app-details'>
                         <div className='home-det-head'>
                              <img alt='logo' src={logo} className='home-logo-img' />
                              <p className="details-title">What Is Offered</p>
                         </div>
                         <div className='home-info'>
                              <div className='home-data'>
                                   <ul>
                                        <li>Create House Designs from scratch</li>
                                        <li>View the house design in 2D and 3D</li>
                                        <li>Switch between using metric or imperial units</li>
                                        <li>See the dimensions of the project</li>
                                        <li>Gives an estimate of the constrcution materials needed</li>
                                   </ul>
                              </div>
                              <div className='info-btn-cont'>
                                   <Link to="/dash" className="info-btn op-btn extend">
                                        Create Your Project
                                   </Link>
                              </div>
                         </div>
                    </section>
               {/* </div> */}
          </div>
     );
}

export default Home;