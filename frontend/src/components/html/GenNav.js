import React from "react"
// import { useState } from "react";
import {Link} from 'react-router-dom';


export const GenNav = ({...props}) => {


     return (
          <>
               <div className="gen-nav">
                    <Link to="/">
                         <button className="gen-nav-btn" type="submit">Home</button>
                    </Link>
                    {/* Go to /about */}
                    <Link to="/about">
                         <button className="gen-nav-btn" type="submit">About</button>
                    </Link>
                    <Link to="/dash">
                         <button className="gen-nav-btn" type="submit">Dash</button>
                    </Link>
               </div>
          </>
     );
}