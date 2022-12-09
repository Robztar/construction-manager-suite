import React from 'react';
import {Link} from 'react-router-dom';
import { useStore } from '../hooks/objStore';
import { useState } from 'react';

const Dash = ()=>{
     const [objects, fixtures,
          conversion, scale, 
          saveScene, 
          resetWorld,
          resetFixtures,
     ] 
     = useStore((state) => [ state.objects, state.fixtures,
          state.conv, state.scale,
          state.saveWorld,
          state.resetWorld,
          state.resetFixtures,
     ]);
     // .....Scrap later
     // let objBoxes = objects.filter(obj => obj.shape === 'box' && obj.texture === 'blank');
     // objBoxes.forEach(element => {
     //      // console.log(element)
     //      // volumes = [...volumes, 
     //      //      (element.dimTemp[1]*conversion)
     //      //      *(element.dimTemp[2]*conversion)
     //      //      *(element.dimTemp[2]*conversion)
     //      // ];
     //      totalArea += 
     //      (element.dimTemp[0]*conversion)
     //      *(element.dimTemp[2]*conversion);

     //      totalVolume += 
     //      (element.dimTemp[0]*conversion)
     //      *(element.dimTemp[1]*conversion)
     //      *(element.dimTemp[2]*conversion);
     //      // console.log(element.dimTemp[1]);
     // });

     let totalArea = 0;       //Floor Area
     let floorVol = 0;     //Floor Volume (Special)


     let rccVol = 0;     //Volume of the concrete parts
     let woodVol = 0;         //Volume of the wooden parts

     // Ignore for now
     let totalVolume = 0;
     let unit;
     
     // Civil Engineering Videos
          // https://www.youtube.com/watch?v=0mI8soDEI9o (Ratio Explanation)
          // https://www.youtube.com/watch?v=qCbFe1hE3mw
          // https://www.youtube.com/watch?v=Ma6VTyZel6I
          // https://www.youtube.com/watch?v=_1NEcehp1hw

     // All construction materials estimated
          // https://www.my-island-jamaica.com/materials-needed-to-build-a-house-in-jamaica.html
          // https://happho.com/choose-building-materials-estimate-cost-quantities-house-construction/
          // https://www.veriaconcyclopedia.com/v/esti/esti-chbr

     // Foundation Estimation
          // https://www.hunker.com/13401739/how-to-estimate-a-concrete-foundation
          // https://www.hunker.com/12001614/how-to-calculate-rebar-needed-in-a-concrete-foundation
          // https://theconstructor.org/practical-guide/measurement-of-reinforced-concrete-works/8228/
          // https://theconstructor.org/practical-guide/material-estimation/

     // Calculate concrete blocks needed
          // https://www.hunker.com/13401526/how-to-calculate-how-many-concrete-blocks-are-needed-for-a-garage
          // https://www.lceted.com/2022/05/concrete-block-calculator-estimator.html

     let rooms = objects.filter(obj => obj.type === 'room' && obj.shape === 'rect');
     rooms.forEach(elem => {
          // Floor Area
          totalArea += 
          (elem.dimTemp[0]*conversion)
          *(elem.dimTemp[2]*conversion);

          // Floor Volume
          floorVol += (totalArea * 2);

          // Do later
          // if(elem.material === 'rcc'){
          //      rccVol += (totalArea * 2)
          // }
          // if(elem.material === 'wood'){
          //      woodVol += (totalArea * 2)
          // }

          // Ignore for now
          totalVolume += 
          (elem.dimTemp[0]*conversion)
          *(elem.dimTemp[1]*conversion)
          *(elem.dimTemp[2]*conversion);
     });

     if(scale === 'metric'){
          totalArea /= (4**2)
          totalVolume /= (4**3)
          unit = 'm'
     }else if(scale === 'imperial'){
          unit = 'ft'
     }
     // console.log("Total volume = "+ totalVolume + " "+unit+" of blank material");

     let wetVol = 0;          //Wet Concrete volume
     let dryVol = 0;          //Dry Mix volume
     let cementVol = 0;       //Cement volume
     let cementBags = 0;      //No. of Cement Bags
     let sandVol = 0;         //Sand Volume
     let aggrVol = 0;         //Aggregate Volume
     let block = 0;        //All the blocks needed
     let steel = 0;        //All the steel needed

     const [projWindow, setProjWindow] = useState('');
     const changeView = (e) => {
          const projName = e.target.getAttribute("data-proj");
          // console.log(projName);
          setProjWindow(projName);
     }

     // const saveScene = () =>{
     //      saveFixtures();
     //      saveWorld();
     // }
     const resetScene = () =>{
          resetFixtures();
          resetWorld();
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