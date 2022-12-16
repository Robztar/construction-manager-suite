import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/GroundUp-Logo.png';

// https://www.positronx.io/how-to-trigger-onscroll-event-in-react-functional-component/

const About = ()=>{
     const [percent, setPercent] = useState(0);
     const [notBase, setNotBase] = useState(true);
     const [notTop, setNotTop] = useState(false);
     
     const handleScroll = (e) =>{
          const height = e.currentTarget.clientHeight;
          const wHeight = document.getElementById('about-cont').offsetHeight;
          console.log("Overall Height: " + height);
          console.log("Window Height: " + wHeight);
          const sHeight = e.currentTarget.scrollHeight;
          // console.log("Scroll Height?: " + sHeight);
          const sTop = e.currentTarget.scrollTop;
          console.log("Distance from Top: " + sTop/2);
          if(sTop/2 === 0){
               setNotTop(false);
          }
          if(sTop/2 > 0 && sTop/2 !== height*2.5){
               setNotBase(true);
               setNotTop(true);
          }
          if(sTop/2 === height*2.5){
               setNotBase(false);
          }

          const progress = ((sTop + height)/sHeight) * 100;
          // console.log("Scroll Progress: " + progress);
          setPercent((+progress.toFixed(0))+'%');
     }
          

     return (
          <div 
               id='about-cont'
               onScroll={handleScroll}
          >
               
               {(() =>{ 
                    if(notTop){
                         console.log('Not Top');
                         return(
                              <>
                                   {/* Floating Progress Bar */}
                                   <div 
                                        className='float pres-prog'
                                        style={{'width': percent}}
                                   ></div>

                                   {/* Floating To-top Button */}
                                   <a 
                                        className='float to-top'
                                        href='#pres-head'
                                   ><i className="fas fa-angle-double-up"></i></a>

                                   
                              </>
                         )
                    }
                    return null;
               }) () }
               {(() =>{ 
                    if(notBase){
                         console.log('Not Base');
                         return(
                              <>
                                   {/* Floating To-base Button */}
                                   <a 
                                        className='float to-base'
                                        href='#slide-end'
                                   ><i className="fas fa-angle-double-down"></i></a>
                              </>
                         )
                    }
                    return null;
               }) () }
               {(() =>{ 
                    if(!notBase && !notTop){
                         return(
                              <>
                                   {/* Floating To-top Button */}
                                   <a 
                                        className='float to-top'
                                        href='#pres-head'
                                   ><i className="fas fa-angle-double-up"></i></a>

                                   {/* Floating To-base Button */}
                                   <a 
                                        className='float to-base'
                                        href='#slide-end'
                                   ><i className="fas fa-angle-double-down"></i></a>
                              </>
                         )
                    }
                    return null;
               }) () }
               

               <section className="about-sect" id='pres-head'>
                    <div></div>
                    <div className='about-slides'>
                         <img alt='logo' src={logo} className='about-logo-img' />
                         <p className="about-title">
                              <span>GroundUp</span><br/>House Designer 
                         </p>
                         <i className='pres-author'>by Robert McFarlane</i>
                    </div>
                    <a href='#slide-1' className="about-start-btn">Proceed</a>
               </section>

               <section className="about-sect" id='slide-1'>
                    <a href='#pres-head' className="about-arrow"><i className="fas fa-arrow-up"></i></a>
                    <div className='about-slides'>
                         <h2 className="slide-header">Objectives</h2>
                         <ul className='slide-data'>
                              <li>
                                   The Problem
                              </li>
                              <li>
                                   The Solution
                              </li>
                              <li>
                                   My Proposal
                              </li>
                              <li>
                                   Demonstration!
                              </li>
                         </ul>
                    </div>
                    <a href='#slide-2' className="about-arrow"><i className="fas fa-arrow-down"></i></a>
               </section>

               <section className="about-sect" id='slide-2'>
                    <a href='#slide-1' className="about-arrow"><i className="fas fa-arrow-up"></i></a>
                    <div className='about-slides'>
                         <h2 className="slide-header">The Problem</h2>
                         <ul className='slide-data'>
                              <li>
                                   Building a dream house starts with a design idea
                              </li>
                              <li>
                                   This is the purpose of a house-designing software
                              </li>
                              <li>
                                   Once there is a design, it’s hard to know where to start
                              </li>
                         </ul>
                    </div>
                    <a href='#slide-3' className="about-arrow"><i className="fas fa-arrow-down"></i></a>
               </section>
               <section className="about-sect" id='slide-3'>
                    <a href='#slide-2' className="about-arrow"><i className="fas fa-arrow-up"></i></a>
                    <div className='about-slides'>
                         <h2 className="slide-header">The Solution</h2>
                         <ul className='slide-data'>
                              <li>
                                   Provide assistance beyond the visual design stage
                              </li>
                              <li>
                                   A major step going from design to execution is the cost of construction
                              </li>
                              <li>
                                   Software could provide details that contribute greatly to the cost of construction
                              </li>
                         </ul>
                    </div>
                    <a href='#slide-4' className="about-arrow"><i className="fas fa-arrow-down"></i></a>
               </section>
               <section className="about-sect" id='slide-4'>
                    <a href='#slide-3' className="about-arrow"><i className="fas fa-arrow-up"></i></a>
                    <div className='about-slides'>
                         <h2 className="slide-header">My Proposal – GroundUp </h2>
                         <ul className='slide-data'>
                              <li>
                                   Allows for a simple house designing process
                              </li>
                              <li>
                                   Allows both 2D and 3D viewing of the house
                              </li>
                              <li>
                                   Provides house specifications such as floor area, wall dimensions, etc.
                              </li>
                              <li>
                                   Allows for the measurement scale to be changed
                              </li>
                              <li>
                                   Gives an estimate of the materials necessary for the house size
                              </li>
                              <i className='about-disclaimer'>
                                   i.e. – Will assume the building is made from block-and-steel construction according to Jamaican standards.
                              </i>
                         </ul>
                    </div>
                    <a href='#slide-end' className="about-arrow"><i className="fas fa-arrow-down"></i></a>
               </section>
               
               <section className="about-sect" id='slide-end'>
                    <a href='#slide-4' className="about-arrow"><i className="fas fa-arrow-up"></i></a>
                    <div className='about-slides'>
                         <img alt='logo' src={logo} className='about-end-img' />
                         <p className="pres-end-title">Demonstration Time!</p>
                    </div>
                    
                    <Link to="/">
                         <button className="about-proceed">Start</button>
                    </Link>
               </section>
          </div>
     );
}

export default About;