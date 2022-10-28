import React from "react"
// import { useState } from "react";
import {Link} from 'react-router-dom';


const Navbar = ({newObj}) => {
     // const [isActive, setActive] = useState(false);

     // const toggleClass = () => {
     //      setActive(!isActive);
     // }
     // const addNew = () =>{
     //      // ...code to add new object
     //      newObj = false;
     //      toggleClass();
     // }


     return (
          <>
               {/* <div className="top"> */}
                    <div className="top navbar">
                         <Link to="/">
                              <button className="home-btn" type="submit">Home</button>
                         </Link>
                         <div className="proj-head">
                              <div>Project Name</div>
                              <div>Floor Selector</div>
                         </div>
                         <Link to="/">
                              <i class="far fa-times-circle"></i>
                         </Link>
                    </div>

                    {/* <div className={`top drop-menu ${isActive ? 'active' : ''}`} >  */}
                         {/* Hamburger */}
                         {/* <div className={`exham extgl ${isActive ? 'active' : ''}`} onClick={toggleClass}>
                              <div className="tripbar">
                              </div>
                         </div> */}
                         {/* Objects Menu */}
                         {/* <div className={`object-menu ${isActive ? 'active' : ''}`}>
                              <div className="object-li" onClick={addNew}>
                                   <p className="object-n">box</p>
                                   <p className="object-t">img</p>
                              </div>
                              <div className="object-li" onClick={addNew}>
                                   <p className="object-n">g</p>
                                   <p className="object-t">b</p>
                              </div>
                         </div>
                    </div> */}
               {/* </div> */}
          </>
     );
}

export default Navbar;