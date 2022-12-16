import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import { GenNav } from '../components/html/GenNav';
import { Confirm } from '../components/html/Confirm';

import { useStore } from '../hooks/objStore';

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

const Dash = ()=>{
     const [objects, fixtures, projects,
          addProj,
          delProject,
          delProjWorld,
          delProjFixes,
          saveProjects,
          saveWorld,
          saveFixtures,
          switchScale,
          switchConv,
          changeProjName,
     ] 
     = useStore((state) => [ state.objects, state.fixtures,
          state.projects,
          state.addProj,
          state.delProject,
          state.delProjWorld,
          state.delProjFixes,
          state.saveProjects,
          state.saveWorld,
          state.saveFixtures,
          state.switchScale,
          state.switchConv,
          state.changeProjName,
     ]);

     const [createPopup, setCreatePop] = useState(false);
     const toggleCreatePop = () => setCreatePop(!createPopup);

     const [projKey, setProjKey] = useState(null);
     const [projWindow, setProjWindow] = useState(null);
     const changeView = (e) => {
          const projName = e.target.getAttribute("data-proj");
          const pKey = e.target.getAttribute("data-projid");
          // console.log(projName);
          setProjWindow(projName);
          setProjKey(pKey);
     }

     const [setMenu, setSettings] = useState(false);
     const toggleSettings = () => setSettings(!setMenu);

     const makeMetric = () => {
          switchScale('metric', projKey);
          switchConv(12, projKey);
          saveProjects();
     }
     const makeImperial = () => {
          switchScale('imperial', projKey);
          switchConv(10, projKey);
          saveProjects();
     }

     const [popMenu, setPopMenu] = useState(false);
     const togglePop = () => setPopMenu(!popMenu);

     const delProjData = (e) =>{
          let target = e;
          delProject(projKey);
          delProjWorld(projKey);
          delProjFixes(projKey);
          // console.log(projects[0]);
          saveProjects();
          saveWorld();
          saveFixtures();
          togglePop();
          changeView(target);
     }

     let projInstance = projects.find(p => p.key === projKey);
     let rooms = objects.filter(obj => obj.projId === projKey && obj.objType === 'room' && obj.shape === 'rect');
     let scale;
     let conversion;

     // New Per/Area Units
     let cementRate;
     let sandRate;
     let aggrRate;
     let steelRate;
     let blocksRate;
     
     // Accumulated values for the project
     let projVals = {
          floorArea: 0,
          wallArea: 0
     }

     if(projInstance){
          scale = projInstance.scale;
          conversion = projInstance.conversion;

          rooms.forEach(elem => {
               // Floor Area
               projVals.floorArea += 
                    (elem.dimTemp[0]*conversion)
                    *(elem.dimTemp[2]*conversion);
     
               // Wall
               let wallHeights = [
                    elem.wallDimTempY[0] * conversion,
                    elem.wallDimTempY[1] * conversion,
                    elem.wallDimTempY[2] * conversion,
                    elem.wallDimTempY[3] * conversion,
               ];
               let wallLengths = [
                    elem.dimTemp[2] * conversion,
                    elem.dimTemp[2] * conversion,
                    elem.dimTemp[0] * conversion,
                    elem.dimTemp[0] * conversion,
               ];
               let wallAreas = [
                    wallHeights[0] * wallLengths[0],
                    wallHeights[1] * wallLengths[1],
                    wallHeights[2] * wallLengths[2],
                    wallHeights[3] * wallLengths[3],
               ];
     
               let fixHeights = [0,0,0,0];
               let fixLengths = [0,0,0,0];
               let fixAreas = [0,0,0,0];
               
               let thisFixes = fixtures.filter(fix => fix.objID === elem.key);
               thisFixes.forEach(fix => {
                    if(fix.wallNum === 0){
                         fixHeights[0] += fix.dimTemp[1] * conversion;
                         fixLengths[0] += fix.dimTemp[2] * conversion;
                    }
                    if(fix.wallNum === 1){
                         fixHeights[1] += fix.dimTemp[1] * conversion;
                         fixLengths[1] += fix.dimTemp[2] * conversion;
                    }
                    if(fix.wallNum === 2){
                         fixHeights[2] += fix.dimTemp[1] * conversion;
                         fixLengths[2] += fix.dimTemp[2] * conversion;
                    }
                    if(fix.wallNum === 3){
                         fixHeights[3] += fix.dimTemp[1] * conversion;
                         fixLengths[3] += fix.dimTemp[2] * conversion;
                    }
               });
     
               fixAreas = [
                    fixHeights[0]*fixLengths[0],
                    fixHeights[1]*fixLengths[1],
                    fixHeights[2]*fixLengths[2],
                    fixHeights[3]*fixLengths[3],
               ];
     
               wallAreas[0] -= fixAreas[0];
               wallAreas[1] -= fixAreas[1];
               wallAreas[2] -= fixAreas[2];
               wallAreas[3] -= fixAreas[3];
     
               projVals.wallArea += (
                    wallAreas[0] + 
                    wallAreas[1] +
                    wallAreas[2] +
                    wallAreas[3]
               );
          });

          if(scale === 'metric'){
               cementRate = 5.23;  // bags per m^2
               sandRate = 0.55;    // m^3 of sand per m^2
               aggrRate = 0.42;    // m^3 of aggregate per m^2
               steelRate = 0.05;   // tonnes of steel per m^2
               blocksRate = 20.67; // blocks per sqft
          
               projVals.floorArea /= (4**2);
               projVals.wallArea /= (4**2);
          }else if(scale === 'imperial'){
               cementRate = 0.47;  // bags per sqft
               sandRate = 1.8 / 27;     // yards^3 of sand per sqft
               aggrRate = 1.35 / 27;    // yards^3 of aggregate per sqft
               steelRate = 0.004;  // tonnes of steel per sqft
               blocksRate = 1.92;  // blocks per sqft
          }
          // console.log("projInstance is up: "+projInstance);
     }
     // else{console.log("projInstance is down: ")}

     // No of 42.5kg cement bags
     let totCementBags = Math.ceil(projVals.floorArea * cementRate);
     // No of concrete blocks
     let totBlocks = Math.ceil(projVals.floorArea * blocksRate);
     // Cubic (m / yards) of sand
     let totSandVol = projVals.floorArea * sandRate;
     // Cubic (m /yards) of aggregate -- stone
     let totAggrVol = projVals.floorArea * aggrRate;
     // (tonnes) of steel
     let totSteelWt = projVals.floorArea * steelRate;

     return (
          <div className="dash-gen-cont">
               {/* NavBar */}
               {projWindow ? null : <GenNav />}
               

               <div className="dash-cont">
                    <section className='dash-sect'>
                         {/* Page Head */}
                         <div className='dash-head'>
                              <h1 className="dash-title">Welcome to Your Projects Dashboard</h1>
                              <div className='dash-details'>
                                   <h3>You have {projects.length} Project(s): </h3>
                                   <div 
                                        className='dash-create-proj'
                                        onClick={toggleCreatePop}
                                   >
                                        Create Project
                                        <i className="far fa-times-circle"></i>
                                   </div>
                              </div>
                         </div>

                         {/* All project tiles */}
                         <div className='proj-tiles-cont'>
                              {projects.map(({key,name}) =>{
                                   const projName = name.charAt(0).toUpperCase() + name.slice(1);
                                   const thisKey = key;
                                   return(
                                        <div 
                                             className='proj-tile'
                                             key={key}
                                        >
                                             <Link to={`/edit?id=${thisKey}`} className='proj-tile-title'>
                                                  {projName}
                                             </Link>
                                             <Link to={`/edit?id=${thisKey}`} className='proj-tile-open'>
                                                  <i className="fas fa-sign-in-alt"></i>
                                             </Link>
                                             <i className='far fa-edit proj-tile-edit' data-projid={key} data-proj={projName} onClick={changeView}></i>
                                        </div>
                                   )
                              })}
                         </div>

                         {/* Selected Project's Data */}
                         <div className={`proj-window-cont ${projWindow === null ? '' : 'active'}`}>
                              <div className='proj-window-header'>
                                   <h2>{projWindow === null ? '' :
                                        projWindow.charAt(0).toUpperCase() + projWindow.slice(1)
                                   }</h2>
                                   <i className="far fa-times-circle" onClick={changeView}></i>
                              </div>
                              <div className='proj-controls'>
                                   <Link to={`/edit?id=${projKey}`} className='proj-open'>
                                        Open Project
                                   </Link>
                                   <div className='proj-manip'>
                                        <i className={`fas fa-cog proj-set ${setMenu ? 'active' : ''}`} onClick={toggleSettings}></i>
                                        {/* Settings Menu */}
                                        <div className={`float dash-set-cont ${setMenu ? 'active' : ''}`}>
                                             <div className='dash-set-close'>
                                                  <i className="fas fa-window-close" onClick={toggleSettings}></i>
                                             </div> 
                                             <div className='dash-settings'>
                                                  {/* Set Scale */}
                                                  <div className="dash-scale">
                                                       <p className={`dash-set-n dash-metric ${scale === 'metric' ? 'active' : ''}`} onClick={makeMetric}>Metric</p>
                                                       <p className={`dash-set-n dash-imperial ${scale === 'imperial' ? 'active' : ''}`} onClick={makeImperial}>Imperial</p>
                                                  </div>
                                                  {/* Change Proj Name */}
                                                  <div className="dash-proj-n-cont">
                                                       <label className="dash-proj-n">Project Name:</label>
                                                       <input 
                                                            id='new-proj-name'
                                                            className='dash-proj-change-n'
                                                            type='text'
                                                            defaultValue={projWindow}
                                                       />
                                                  </div>
                                                  <div
                                                       className="dash-proj-n-sub"
                                                       onClick={(e) =>{
                                                            let name = document.getElementById('new-proj-name').value;
                                                            let newName;
                                                            if (name.length > 3) {
                                                                 newName = name;
                                                                 // console.log(newName);
                                                                 changeProjName(newName, projKey);
                                                                 setProjWindow(newName);
                                                                 saveProjects();
                                                            }
                                                       }}
                                                  >Change Name</div>
                                             </div> 
                                        </div>
                                        <i className='fas fa-trash-alt proj-del' onClick={togglePop}></i>
                                   </div>
                              </div>
                              <div className='proj-details'>
                                   <div className='proj-areas'>
                                        <div>Floor Area = {+projVals.floorArea.toFixed(2)} {scale==='metric'? 'm':'ft'} <sup>2</sup></div>
                                        <div>Wall Area = {+projVals.wallArea.toFixed(2)} {scale==='metric'? 'm':'ft'} <sup>2</sup></div>
                                   </div>
                                   <div className='proj-mat-menu'>
                                        <div className='mat-menu-title'>Construction Materials</div>
                                        <div className='mat-menu-body'>
                                             <div className='mat-li'>
                                                  <div className='mat-type'>
                                                       Cement <i className="fas fa-info" title='1 bag = 42.5kg'></i>:
                                                  </div> 
                                                  <div className='mat-quant'>{totCementBags} bags</div>
                                             </div>
                                             <div className='mat-li'>
                                                  <div className='mat-type'>
                                                       Blocks <i className="fas fa-info" title='concrete hollow blocks'></i>:
                                                  </div> 
                                                  <div className='mat-quant'>{totBlocks} blocks</div>
                                             </div>
                                             <div className='mat-li'>
                                                  <div className='mat-type'>
                                                       Sand <i 
                                                            className="fas fa-info" 
                                                            title={scale==='metric'? '':'or just "yards"'}
                                                       ></i>:
                                                  </div> 
                                                  <div className='mat-quant'>
                                                       {scale==='metric'? +totSandVol.toFixed(2):+totSandVol.toFixed(2)}
                                                       {scale==='metric'? ' m':' yards'}
                                                       <sup>3</sup>
                                                  </div>
                                             </div>
                                             <div className='mat-li'>
                                                  <div className='mat-type'>
                                                       Aggregate <i 
                                                            className="fas fa-info"
                                                            title={scale==='metric'? '':'or just "yards"'}
                                                       ></i>:
                                                  </div> 
                                                  <div className='mat-quant'>
                                                       {scale==='metric'? +totAggrVol.toFixed(2):+totAggrVol.toFixed(2)}
                                                       {scale==='metric'? ' m':' yards'}
                                                       <sup>3</sup>
                                                  </div>
                                             </div>
                                             <div className='mat-li'>
                                                  <div className='mat-type'>
                                                       Steel <i 
                                                            className="fas fa-info"
                                                            title='1 tonne = 1000kg'
                                                       ></i>:
                                                  </div> 
                                                  <div className='mat-quant'>
                                                       {+totSteelWt.toFixed(2)} tonnes
                                                  </div>
                                             </div>
                                        </div>
                                        <i className="dash-disclaimer">
                                             Disclaimer: This is an estimation of the materials necessary 
                                             for the structure of a house. Always use a qualified 
                                             quantity surveyor before starting construction.
                                        </i>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>

               {/* Create New Projects */}
               <div className={`float pop-cont ${createPopup ? 'active' : ''}`}>
                    <div className='pop-check'>
                         <h2>Create Project</h2>
                         <label className="create-proj-title">Project Name:</label>
                         <input 
                              className='create-proj-n'
                              id='proj-name'
                              type='text'
                              defaultValue={'untitled '+(projects.length+1)}
                         />
                         <label className="create-proj-title">Measurement Scale:</label>
                         <div className='create-proj-scale'>
                              <label htmlFor="c-metric">Metric</label>
                              <input type="radio" id="c-metric" name="m-scale" value="metric" defaultChecked />
                              <label htmlFor="c-imperial">Imperial</label>
                              <input type="radio" id="c-imperial" name="m-scale" value="imperial" />
                         </div>
                         <div className='pop-opts'>
                              <div className='create-proj-btn'
                                   onClick={(e) =>{
                                        e.stopPropagation();
                                        toggleCreatePop();
                                   }}
                              >Cancel</div>
                              <div className='create-proj-btn'
                                   onClick={(e) =>{
                                        e.stopPropagation();
                                        let name = document.getElementById('proj-name').value;
                                        let scaleOpts = document.getElementsByName('m-scale');
                                        let choice;
                                        let conv;

                                        if(name.length === 0){
                                             name = 'untitled '+(projects.length+1);
                                        }
                                        if(scaleOpts[0].checked){
                                             choice = scaleOpts[0].value;
                                        }
                                        if(scaleOpts[1].checked){
                                             choice = scaleOpts[1].value;
                                        }
                                        if(choice === 'metric'){
                                             conv = 12
                                        }else{
                                             conv = 10
                                        }
                                        console.log("Name: "+name+" Scale: "+choice+" Conv: "+conv);
                                        addProj(name, choice, conv);
                                        saveProjects();
                                        toggleCreatePop();
                                   }}
                              >Create Project</div>
                         </div>
                    </div>
               </div>

               {/* Deletion Confirm */}
               <Confirm 
                    popMenu={popMenu}
                    togglePop={togglePop}
                    resetScene={delProjData}
                    task={'delete'}
               />
          </div>
     );
}

export default Dash;