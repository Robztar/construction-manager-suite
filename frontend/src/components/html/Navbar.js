import React from "react"
// import { useState } from "react";
import {Link} from 'react-router-dom';
import logo from '../../images/GroundUp-Logo.png';


const Navbar = ({...props}) => {
     const saveScene = props.saveScene;
     const projName = props.projName.charAt(0).toUpperCase() 
          + props.projName.slice(1);

     return (
          <>
               <div className="top navbar">
                    <Link to="/" className="edit-logo-cont">
                         <img alt='logo' src={logo} className='edit-logo-img' onClick={saveScene} />
                    </Link>
                    <div className="proj-head">
                         <div>{projName}</div>
                         {/* <div>Floor Selector</div> */}
                    </div>
                    <div className="nav-icons">
                         <i className="far fa-save" onClick={saveScene}></i>
                         <Link to="/dash">
                              <i className="far fa-times-circle" onClick={saveScene}></i>
                         </Link>
                    </div>
                    
               </div>
          </>
     );
}

export default Navbar;