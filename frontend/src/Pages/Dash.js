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

     let rooms = objects.filter(obj => obj.objType === 'room' && obj.shape === 'rect');
     
     // Wet-Dry Concrete Conversion
     const wet2Dry = 1.54;    // +54%

     let cementBagVol;
     let blockDims;
     let blockSVol;  // minus block spaces
     let allowance;
     let steelArea;
     let steelSpace;
     let steelConv;
     let colWidth = 1.3333   // column width in raw units
     // let columnCS;  // cross section
     
     
     if(scale === 'metric'){
          cementBagVol= 42.5/1440; // kg / (kg/m^3)
          blockDims = [0.203, 0.203, 0.406]; // m
          blockSVol = 0.009;    // m^3
          allowance = 0.025;   // m
          steelArea = Math.PI * (0.013**2); // m^2
          steelSpace = 0.6;   // m
          steelConv = 0.996;   // kg/m
          // colWidth = 0.406    // m
          // columnCS = colWidth * 0.203 // m^2
          
     }else if(scale === 'imperial'){
          cementBagVol= 93.5/89.896;    // lb / (lb/ft^3)
          blockDims = [0.6667, 0.6667, 1.3333];   // ft
          blockSVol = 0.311;    // ft^3
          allowance = 0.0833;  // ft
          steelArea = Math.PI * (0.0417**2);    // ft^2
          steelSpace = 1.9685;   // ft
          steelConv = 0.688;   // lb/ft
          // colWidth = 1.3333   // ft
          // columnCS = colWidth * 0.6667    // ft^2
          
     }

     // let blockArea = blockDims[1]*blockDims[2];
     
     let blockMortarArea = (blockDims[1]+allowance)*(blockDims[2]+allowance);

     // Floor variables
     const concreteRatio = {
          cement: 1,
          sand: 2,
          aggr: 4,
          sum: 7
     };
     let floorVals = {
          area: 0,
          wetVol: 0,
          dryVol: 0,
          cementVol: 0,
          cementBags: 0,
          sandVol: 0,
          aggrVol: 0,
     };

     // Wall variables
     let wallVals = {
          thickness: 0,  // accumulated
          length: 0,     // accumulated
          height: 0,     // accumulated
          area: 0,       // accumulated
          blocks: 0,
          blockVol: 0,
          steelCreteVol: 0,   // volume of concrete and steel
          steelPcs: 0,
          steelVol: 0,
          steelWt: 0,
          wetVol: 0,
          dryVol: 0,
          cementVol: 0,
          cementBags: 0,
          sandVol: 0,
          aggrVol: 0,
     };

     // Column variables
     const colRatio = {
          cement: 1,
          sand: 2,
          aggr: 4,
          sum: 7
     };
     let columnVals = {
          area: 0,
          wetVol: 0,
          dryVol: 0,
          cementVol: 0,
          cementBags: 0,
          sandVol: 0,
          aggrVol: 0,
     };

     rooms.forEach(elem => {
          // Floor Area
          // floorVals.area += 
          //      ((elem.dimTemp[0]-(elem.wallDimTempX[0]+elem.wallDimTempX[1]))*conversion)
          //      *((elem.dimTemp[2]-(elem.wallDimTempX[2]+elem.wallDimTempX[3]))*conversion)
          floorVals.area += 
               (elem.dimTemp[0]*conversion)
               *(elem.dimTemp[2]*conversion)
          
          // console.log("Floor Val = "+floorVals.area);

          // Floor Volume - depth should be changed
          floorVals.wetVol += (floorVals.area * 2);

          // Wall
          let wallHeights = [
               elem.wallDimTempY[0] * conversion,
               elem.wallDimTempY[1] * conversion,
               elem.wallDimTempY[2] * conversion,
               elem.wallDimTempY[3] * conversion,
          ];
          let wallLengths = [
               elem.wallDimTempZ[0] * conversion,
               elem.wallDimTempZ[1] * conversion,
               elem.wallDimTempZ[2] * conversion,
               elem.wallDimTempZ[3] * conversion,
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

          let wallDepths = (
               (elem.wallDimTempX[0] * conversion) +
               (elem.wallDimTempX[1] * conversion) +
               (elem.wallDimTempX[2] * conversion) +
               (elem.wallDimTempX[3] * conversion)
          );

          let effectLengths = [
               wallLengths[0] - (colWidth *2),
               wallLengths[1] - (colWidth *2),
               wallLengths[2] - (colWidth *2),
               wallLengths[3] - (colWidth *2),
          ];
          let effectHeights = [
               wallHeights[0] - (fixHeights[0] * (fixLengths[0] / effectLengths[0])),
               wallHeights[1] - (fixHeights[1] * (fixLengths[1] / effectLengths[1])),
               wallHeights[2] - (fixHeights[2] * (fixLengths[2] / effectLengths[2])),
               wallHeights[3] - (fixHeights[3] * (fixLengths[3] / effectLengths[3])),
          ];

          wallVals.height += (
               effectHeights[0] + 
               effectHeights[1] +
               effectHeights[2] +
               effectHeights[3] +
               5    // foundation depth in raw units (5ft / 1.524m)
          );
          wallVals.length += (
               effectLengths[0] + 
               effectLengths[1] +
               effectLengths[2] +
               effectLengths[3]
          );
          wallVals.area += (
               wallAreas[0] + 
               wallAreas[1] +
               wallAreas[2] +
               wallAreas[3]
          );
          wallVals.thickness += wallDepths;
     });

     if(scale === 'metric'){
          floorVals.area /= (4**2);
          floorVals.wetVol /= (4**3);
          wallVals.area /= (4**2);
          wallVals.thickness /= 4;
          wallVals.length /= 4;
          wallVals.height /= 4;

     }
     // else if(scale === 'imperial'){}

     // Floor Material Calculations
     floorVals.dryVol = floorVals.wetVol * wet2Dry;
     floorVals.cementVol = (concreteRatio.cement/concreteRatio.sum)*floorVals.dryVol;
     floorVals.cementBags = Math.ceil(floorVals.cementVol/cementBagVol);
     floorVals.sandVol = Math.ceil((concreteRatio.sand/concreteRatio.sum)*floorVals.dryVol);
     floorVals.aggrVol = Math.ceil((concreteRatio.aggr/concreteRatio.sum)*floorVals.dryVol);
     
     // Wall Material Calculations
     wallVals.blocks = Math.ceil(wallVals.area / blockMortarArea);
     wallVals.blockVol = wallVals.blocks * blockSVol;
     wallVals.steelCreteVol = (wallVals.area * wallVals.thickness) - wallVals.blockVol;
     wallVals.steelPcs = Math.ceil(wallVals.length / steelSpace);
     wallVals.steelVol = steelArea * wallVals.height * wallVals.steelPcs;
     wallVals.steelWt = wallVals.steelPcs * wallVals.height * steelConv;
     wallVals.wetVol = wallVals.steelCreteVol - wallVals.steelVol;

     wallVals.dryVol = wallVals.wetVol * wet2Dry;
     wallVals.cementVol = (concreteRatio.cement/concreteRatio.sum)*wallVals.dryVol;
     wallVals.cementBags = Math.ceil(wallVals.cementVol/cementBagVol);
     wallVals.sandVol = Math.ceil((concreteRatio.sand/concreteRatio.sum)*wallVals.dryVol);
     wallVals.aggrVol = Math.ceil((concreteRatio.aggr/concreteRatio.sum)*wallVals.dryVol);


     // No of 42.5kg cement bags
     let totCementBags = floorVals.cementBags + wallVals.cementBags;
     // Cubic (m / ft) of sand
     let totSandVol = floorVals.sandVol + wallVals.sandVol;
     // Cubic (m / ft) of aggregate -- stone
     let totAggrVol = floorVals.aggrVol + wallVals.aggrVol;
     // (lbs / kg) of steel
     let totSteelWt = wallVals.steelWt;

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
                         <h1 className="dash-title">Projects</h1>

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
                                                       Open Project
                                                  </Link>
                                                  <div className='proj-manip'>
                                                       <i className="fas fa-cog proj-set"></i>
                                                       <i className='fas fa-trash-alt proj-del' onClick={resetScene}></i>
                                                  </div>
                                             </div>
                                             <div className='proj-details'>
                                                  <div className='proj-areas'>
                                                       <div>Area = {floorVals.area} {scale==='metric'? 'm':'ft'} <sup>2</sup></div>
                                                       <div>Wall Area = {wallVals.area} {scale==='metric'? 'm':'ft'} <sup>2</sup></div>
                                                  </div>
                                                  <div className='proj-mat-menu'>
                                                       <div className='mat-menu-title'>Construction Materials</div>
                                                       <div className='mat-menu-body'>
                                                            <div className='mat-li'>
                                                                 <div className='mat-type'>Cement (i):</div> 
                                                                 <div className='mat-quant'>{totCementBags} bags</div>
                                                            </div>
                                                            <div className='mat-li'>
                                                                 <div className='mat-type'>Blocks (i):</div> 
                                                                 <div className='mat-quant'>{wallVals.blocks} blocks</div>
                                                            </div>
                                                            <div className='mat-li'>
                                                                 <div className='mat-type'>Sand (i):</div> 
                                                                 <div className='mat-quant'>
                                                                      {/* {totSandVol} */}
                                                                      {scale==='metric'? +totSandVol.toFixed(2):+(totSandVol/27).toFixed(2)}
                                                                      {scale==='metric'? ' m':' yards'}
                                                                      <sup>3</sup>
                                                                 </div>
                                                            </div>
                                                            <div className='mat-li'>
                                                                 <div className='mat-type'>Aggregate (i):</div> 
                                                                 <div className='mat-quant'>
                                                                      {scale==='metric'? +totAggrVol.toFixed(2):+(totAggrVol/27).toFixed(2)}
                                                                      {scale==='metric'? ' m':' yards'}
                                                                      <sup>3</sup>
                                                                 </div>
                                                            </div>
                                                            <div className='mat-li'>
                                                                 <div className='mat-type'>Steel (i):</div> 
                                                                 <div className='mat-quant'>
                                                                      {scale==='metric'? +(totSteelWt/1000).toFixed(2):+(totAggrVol/2000).toFixed(2)}
                                                                      {scale==='metric'? ' tonnes':' tons'}
                                                                 </div>
                                                            </div>
                                                       </div>
                                                       
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
                                                       Open Project
                                                  </Link>
                                                  <div className='proj-manip'>
                                                       <i className="fas fa-cog proj-set"></i>
                                                       <i className='fas fa-trash-alt proj-del' onClick={resetScene}></i>
                                                  </div>
                                             </div>
                                             <div className='proj-details'>
                                                  <div className='proj-areas'>
                                                       <div>Area = {floorVals.area} {scale==='metric'? 'm':'ft'} <sup>2</sup></div>
                                                       <div>Wall Area = {wallVals.area} {scale==='metric'? 'm':'ft'} <sup>2</sup></div>
                                                  </div>
                                                  <div className='proj-mat-menu'>
                                                       <div className='mat-menu-title'>Construction Materials</div>
                                                       <div className='mat-menu-body'>
                                                            <div className='mat-li'>
                                                                 <div className='mat-type'>Cement (i):</div> 
                                                                 <div className='mat-quant'>{totCementBags} bags</div>
                                                            </div>
                                                            <div className='mat-li'>
                                                                 <div className='mat-type'>Blocks (i):</div> 
                                                                 <div className='mat-quant'>{wallVals.blocks} blocks</div>
                                                            </div>
                                                            <div className='mat-li'>
                                                                 <div className='mat-type'>Sand (i):</div> 
                                                                 <div className='mat-quant'>
                                                                      {scale==='metric'? +totSandVol.toFixed(2):+(totSandVol/27).toFixed(2)}
                                                                      {scale==='metric'? ' m':' yards'}
                                                                      <sup>3</sup>
                                                                 </div>
                                                            </div>
                                                            <div className='mat-li'>
                                                                 <div className='mat-type'>Aggregate (i):</div> 
                                                                 <div className='mat-quant'>
                                                                      {scale==='metric'? +totAggrVol.toFixed(2):+(totAggrVol/27).toFixed(2)}
                                                                      {scale==='metric'? ' m':' yards'}
                                                                      <sup>3</sup>
                                                                 </div>
                                                            </div>
                                                            <div className='mat-li'>
                                                                 <div className='mat-type'>Steel (i):</div> 
                                                                 <div className='mat-quant'>
                                                                      {scale==='metric'? +(totSteelWt/1000).toFixed(2):+(totAggrVol/2000).toFixed(2)}
                                                                      {scale==='metric'? ' tonnes':' tons'}
                                                                 </div>
                                                            </div>
                                                       </div>
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