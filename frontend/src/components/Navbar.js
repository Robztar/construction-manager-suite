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
               <div className="top navbar">
                    <Link to="/">
                         <button className="home-btn" type="submit">Home</button>
                    </Link>
                    <div className="proj-head">
                         <div>Project Name</div>
                         <div>Floor Selector</div>
                    </div>
                    <Link to="/dash">
                         <i className="far fa-times-circle"></i>
                    </Link>
               </div>
          </>
     );
}

export default Navbar;