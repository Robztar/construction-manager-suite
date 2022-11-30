import React from 'react';
import {Link} from 'react-router-dom';
import { useStore } from '../hooks/objStore';
import { useState } from 'react';

const Dash = ()=>{
     const [objects, conversion, scale, saveScene, resetScene] 
     = useStore((state) => [ state.objects, state.conv, state.scale,
          state.saveWorld,
          state.resetWorld,]);
     
     let objBoxes = objects.filter(obj => obj.shape === 'box' && obj.texture === 'blank');
     // console.log(objBoxes);
     // let volumes = [];
     let totalArea = 0;
     let totalVolume = 0;
     let unit;
     objBoxes.forEach(element => {
          // console.log(element)
          // volumes = [...volumes, 
          //      (element.dimTemp[1]*conversion)
          //      *(element.dimTemp[2]*conversion)
          //      *(element.dimTemp[2]*conversion)
          // ];
          totalArea += 
          (element.dimTemp[0]*conversion)
          *(element.dimTemp[2]*conversion);

          totalVolume += 
          (element.dimTemp[0]*conversion)
          *(element.dimTemp[1]*conversion)
          *(element.dimTemp[2]*conversion);
          // console.log(element.dimTemp[1]);
     });
     // console.log(volumes);
     // Convert total Volume to each scale type
     // metric: totalVolume /= (4**3) -> (x metres^3)
     // imperial: totalVolume -> (x feet^3)
     // console.log('Unit volume = '+ totalVolume + " units of blank material");
     if(scale === 'metric'){
          totalArea /= (4**2)
          totalVolume /= (4**3)
          unit = 'm'
     }else if(scale === 'imperial'){
          unit = 'ft'
     }
     console.log("Total volume = "+ totalVolume + " "+unit+" of blank material");

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
                                             <div className='proj-window-header'>
                                                  <h2>Main Project</h2>
                                                  <i className="far fa-times-circle" onClick={changeView}></i>
                                             </div>
                                             <div className='proj-controls'>
                                                  <Link to="/edit" className='proj-open'>
                                                       Enter
                                                  </Link>
                                                  <div className='proj-set'>Settings</div>
                                                  <div className='proj-del' onClick={resetScene}>Delete</div>
                                             </div>
                                             <div className='proj-details'>
                                                  <div className='proj-area'>Area = {totalArea} {unit}^2</div>
                                                  <div className='proj-mat-menu'>
                                                       <table>
                                                            <tr bgcolor='lightgrey'>
                                                                 <th className='mat-li-head'>Material</th>
                                                                 <th className='mat-li-head'>Volume</th>
                                                            </tr>
                                                            <tr>
                                                                 <td className='mat-li'>Blank</td>
                                                                 <td className='mat-li' align='center'>{totalVolume} {unit}^3</td>
                                                            </tr>
                                                            <tr>
                                                                 <td className='mat-li'>Concrete</td>
                                                                 <td className='mat-li' align='center'>x {unit}^3</td>
                                                            </tr>
                                                            <tr>
                                                                 <td className='mat-li'>Wood</td>
                                                                 <td className='mat-li' align='center'>x {unit}^3</td>
                                                            </tr>
                                                       </table>
                                                       {/* <div className='mat-li-head'>Material</div>
                                                       <div className='mat-li-head'>Volume</div>
                                                       <div className='mat-li'>Blank</div>
                                                       <div className='mat-li'>{totalVolume} {unit}^3</div> */}
                                                  </div>
                                             </div>
                                        </div>
                                   )
                              }else if(projWindow === 'test'){
                                   return(
                                        <div className='proj-window-cont'>
                                             <div className='proj-window-header'>
                                                  <h2>R&D Project</h2>
                                                  <i className="far fa-times-circle" onClick={changeView}></i>
                                             </div>
                                             <div className='proj-controls'>
                                                  <Link to="/test" className='proj-open'>
                                                       Enter
                                                  </Link>
                                                  <div className='proj-set'>Settings</div>
                                                  <div className='proj-del' onClick={resetScene}>Delete</div>
                                             </div>
                                             <div className='proj-details'>
                                                  <div className='proj-area'>Area = {totalArea} {unit}^2</div>
                                                  <div className='proj-mat-menu'>
                                                       <div className='mat-menu-title'>Material List</div>
                                                       <div className='mat-li-head'>Material</div>
                                                       <div className='mat-li-head'>Volume</div>
                                                       <div className='mat-li'>Blank</div>
                                                       <div className='mat-li'>{totalVolume} {unit}^3</div>
                                                  </div>
                                             </div>
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