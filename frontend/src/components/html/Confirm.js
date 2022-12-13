import React from "react";


export const Confirm = ({...props}) => {
     const popMenu = props.popMenu;
     const togglePop = props.togglePop;
     const resetScene = props.resetScene;
     const task = props.task;

     return (
          <>
               <div className={`float pop-cont ${popMenu ? 'active' : ''}`}>
                    <div className='pop-check'>
                         <h2>{task === 'erase'? 'Erase Project Data': 'Delete Project'}</h2>
                         <p>Are you sure you want to {task === 'erase'? "clear the project's canvas?": "delete the project?"}</p>
                         <div className='pop-opts'>
                              <div className='no' onClick={togglePop}>Never Mind</div>
                              <div className='yes' onClick={resetScene}>Delete</div>
                         </div>
                    </div>
               </div>
          </>
     );
}