import { useStore } from '../../hooks/objStore';

// Find a way to choose layout among:
     // Objects Menu
     // Models Menu
     // Room Menu

export const FurnishMenu = () =>{
     const [ objects, conversion, scale,
          setFurnishMenu, 
          removeObj,
          setDimTemp,
     ] = useStore((state) => [ state.objects, state.conv, state.scale,
          state.setFurnishMenu,
          state.removeObj,
          state.setDimTemp,
     ]);

     let objInstance = objects.find(o => o.furnishMenu === 'grid');
     let dimensions;
     let actUnits;

     if(objInstance){
          let unique = objInstance.key;
          dimensions = [
               objInstance.dimTemp[0]*conversion,
               objInstance.dimTemp[1]*conversion,
               objInstance.dimTemp[2]*conversion
          ];
          if(scale === 'metric'){
               actUnits = [dimensions[0]/4,dimensions[1]/4,dimensions[2]/4];
          }
          else if (scale === 'imperial'){
               actUnits = [dimensions[0],dimensions[1],dimensions[2]];
          }

          return(
               <div 
                    className='float attr-cont'
                    style={{'display': objInstance.furnishMenu}}
               >
                    <div className="attr-head">
                         <h3 className='attr-title'>
                              Furnishings
                         </h3>
                         <i 
                              className="fas fa-times attr-exit"
                              onClick={()=>setFurnishMenu('')}
                         ></i>
                    </div>
                    <div className='attr-menu'>

                         {/* ----Changing Object Properties ...soon---- */}
                         <div 
                              // className={`pos-props ${ true ? 'inactive' : ''}`}
                              className= 'pos-props'
                         >
                              <div className='props-row'>
                                   <div className='props-type'>Properties</div>
                                   <div className='props-opts'>
                                        <div className='prop'>
                                             {/* Have a separation of units
                                                  _m _cm or _' _"
                                                  based on the type of scale
                                             */}
                                             <label className='prop-n'>Width: </label>
                                             <input 
                                                  type="number"
                                                  // Min max should be decided based on scale 
                                                  min='0' 
                                                  max='10'
                                                  value={actUnits[0]} 
                                                  id="width"
                                                  // Step should be decided based on scale
                                                  step="1"
                                                  onChange={(e) =>{
                                                       let rVal = e.target.value;
                                                       let rDimTemp;
                                                       if(scale === 'metric'){
                                                            rDimTemp=[rVal/3, actUnits[1]/3,actUnits[2]/3]
                                                       }else if(scale === 'imperial'){
                                                            rDimTemp=[rVal/10, actUnits[1]/10,actUnits[2]/10]
                                                       }
                                                       console.log(rVal);
                                                       setDimTemp(rDimTemp, unique);
                                                  }}
                                             />
                                             {/* <input type="range" min="0" max="10" value="5" class="slider" id="myRange"/> */}
                                        </div>
                                        <div className='prop'>
                                        <label className='prop-n'>Lenth: </label>
                                             <input 
                                                  type="number" 
                                                  // Min max should be decided based on scale
                                                  min='0' 
                                                  max='10'
                                                  value={actUnits[2]} 
                                                  id="length"
                                                  // Step should be decided based on scale
                                                  step="1"
                                                  onChange={(e) =>{
                                                       let rVal = e.target.value;
                                                       let rDimTemp;
                                                       if(scale === 'metric'){
                                                            rDimTemp=[actUnits[0]/3, actUnits[1]/3, rVal/3]
                                                       }else if(scale === 'imperial'){
                                                            rDimTemp=[actUnits[0]/10, actUnits[1]/10, rVal/10]
                                                       }
                                                       console.log(rVal);
                                                       setDimTemp(rDimTemp, unique);
                                                  }}
                                             />
                                        </div> 
                                        <div className='prop'>Rotation: </div> 
                                   </div>
                              </div>
                              <div className='props-row'>
                              <div className='props-n'>Something Else</div>
                                   <div className='props-opts'>
                                        <div className='prop'>idk: </div>
                                   </div>
                              </div>
                         </div>
                         
                    </div>
                    <div className='attr-footer'>
                         <div 
                              className='attr-n obj-remove'
                              onClick={() => {
                                   removeObj(unique);
                                   setFurnishMenu('');
                                   // setActive('');
                              }}
                         ><i className="fas fa-trash-alt"></i></div>
                    </div>
               </div>
          )
     }else{
          return null
     }
}