import React from "react"
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';


const Navbar = () => {
     const [isActive, setActive] = useState(false);

     const toggleClass = () => {
          setActive(!isActive);
     }

     return (
          <>
               <div className="top">
                    <div className="navbar">
                         <Link to="/">
                              <button className="home-btn" type="submit">Home</button>
                         </Link>
                         <div className="proj-head">
                              <div>Project Name</div>
                              <div>Floor Selector</div>
                         </div>
                         {/* <div>X-button</div> */}
                         <i class="far fa-times-circle"></i>
                    </div>

                    <div className="dropMenu"> 
                         {/* Hamburger */}
                         <div className={`exham extgl ${isActive ? 'active' : ''}`} onClick={toggleClass}>
                              <div className="tripbar">
                              </div>
                         </div>
                    </div>
               </div>
          </>
     );
}

export default Navbar;