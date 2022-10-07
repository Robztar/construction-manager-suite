import React from "react"
import { useState } from "react";
import {Link} from 'react-router-dom';


const SpaceReminder = () => {
     return (
          <>
               <div className="sr-cont">
                    <div className="space-reminder">
                         Press SPACE to lock/unlock camera
                    </div>
               </div>
          </>
     );
}

export default SpaceReminder;