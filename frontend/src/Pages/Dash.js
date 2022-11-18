import React from 'react';
import {Link} from 'react-router-dom';
import { useStore } from '../hooks/objStore';
import { useState } from 'react';

const Dash = ()=>{
     const [objects, conversion, saveScene, resetScene] 
     = useStore((state) => [ state.objects, state.iniDim,
          state.saveWorld,
          state.resetWorld,]);
     
     // let objRooms = objects.filter(obj => obj.objType === 'room');
     let objBoxes = objects.filter(obj => obj.shape === 'box' && obj.texture === 'blank');
     // console.log(objBoxes);
     let volumes = [];
     let totalVolume = 0;
     objBoxes.forEach(element => {
          // console.log(element)
          volumes = [...volumes, 
               (element.dimTemp[1]*conversion[1])
               *(element.dimTemp[2]*conversion[2])
               *(element.dimTemp[2]*conversion[2])
          ];
          totalVolume += 
          (element.dimTemp[1]*conversion[1])
          *(element.dimTemp[2]*conversion[2])
          *(element.dimTemp[2]*conversion[2]);
          // console.log(element.dimTemp[1]);
     });
     console.log(volumes);
     console.log('total volume = '+ totalVolume + " of blank material");

     const [projWindow, setProjWindow] = useState('');
     const changeView = (e) => {
          const projName = e.target.getAttribute("data-proj");
          // console.log(projName);
          setProjWindow(projName);
     }

     return (
          <div className="gen-cont">
               <div className="dash-cont">
                    <section className='dash-sect'>
                         <h1 className="dash-title">User's Dashboard</h1>

                         {(() =>{
                              if(projWindow === 'main'){
                                   return(
                                        <div className='proj-window-cont'>
                                             <h2>Main Project</h2>
                                             <i className="far fa-times-circle" onClick={changeView}></i>
                                             <Link to="/edit" className='proj-tile'>
                                                  Enter
                                             </Link>
                                        </div>
                                   )
                              }else if(projWindow === 'test'){
                                   return(
                                        <div className='proj-window-cont'>
                                             <h2>R&D Project</h2>
                                             <i className="far fa-times-circle" onClick={changeView}></i>
                                             <Link to="/test" className='proj-tile'>
                                                  Enter
                                             </Link>
                                        </div>
                                   )
                              }else{
                                   return(
                                        <div className='proj-tiles-cont'>
                                             <div className='proj-tile'>
                                                  <div className='proj-thumb main' data-proj='main' onClick={changeView}></div>
                                                  <div className='proj-title'  data-proj='main' onClick={changeView}>Main Project</div>
                                             </div>
                                             <div className='proj-tile'>
                                                  <div className='proj-thumb test' data-proj='test' onClick={changeView}></div>
                                                  <div className='proj-title' data-proj='test' onClick={changeView}>R&D Project</div>
                                             </div>
                                        </div>
                                   )
                              }
                         }) () }
                              

                    </section>
               </div>
          </div>
     );
}

export default Dash;