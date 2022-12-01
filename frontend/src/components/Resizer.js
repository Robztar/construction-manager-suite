import { useStore } from '../hooks/objStore';
import { useState, useEffect } from 'react';

export const Resizer = ({...props}) =>{
     const [ objects, conversion, scale,
          setActive,
          setResize,
          setAttrMenu, 
          setDimTemp,
          setPos,
     ] = useStore((state) => [ state.objects, state.conv, state.scale,
          state.setActive,
          state.setResize,
          state.setAttrMenu,
          state.setDimTemp,
          state.setPos,
     ]);

     let objInstance = props.instance;
     let unique = props.unique;

     let dimensions;

     dimensions = [
          objInstance.dimTemp[0]*conversion,
          objInstance.dimTemp[1]*conversion,
          objInstance.dimTemp[2]*conversion
     ];

     const[unitX,setUnitX] = useState(dimensions[0]/4);
     // const[unitY,setUnitY] = useState(dimensions[1]/4);
     const[unitZ,setUnitZ] = useState(dimensions[2]/4);
     
     useEffect(()=>{
          if(scale === 'metric'){
               setUnitX(dimensions[0]/4);
               // setUnitY(dimensions[1]/4);
               setUnitZ(dimensions[2]/4);
          }
          else if (scale === 'imperial'){
               setUnitX(dimensions[0]);
               // setUnitY(dimensions[1]);
               setUnitZ(dimensions[2]);
          }
     },[objInstance]);
     // Check Scale Also

     return(
          <div 
               className='float resizer-cont'
               style={{'display': objInstance.resize}}
          >
               {/* UI to modify x-axis (width) of the object */}
               <div className='float x-resizer'>
                    {/* Left-side Controls */}
                    <div className='resizer-btn'>
                         <i 
                              className="fas fa-plus-square"
                              onClick={() =>{
                                   let rVal = unitX+1;
                                   let rDimTemp;
                                   if(scale === 'metric'){
                                        rDimTemp=[rVal/3, dimensions[1]/12,dimensions[2]/12];
                                   }else if(scale === 'imperial'){
                                        rDimTemp=[rVal/10, dimensions[1]/10,dimensions[2]/10];
                                   }

                                   let difference = (rVal *4) - dimensions[0];
                                   
                                   let posOffset = [objInstance.pos[0] - (difference/2), 
                                        objInstance.pos[1], objInstance.pos[2]];

                                   setPos(posOffset, unique);
                                   setDimTemp(rDimTemp, unique);
                              }}
                         ></i>
                         <i 
                              className="fas fa-minus-square"
                              onClick={() =>{
                                   let rVal = unitX-1;
                                   let rDimTemp;
                                   if(scale === 'metric'){
                                        rDimTemp=[rVal/3, dimensions[1]/12,dimensions[2]/12];
                                   }else if(scale === 'imperial'){
                                        rDimTemp=[rVal/10, dimensions[1]/10,dimensions[2]/10];
                                   }

                                   let difference = (rVal *4) - dimensions[0];
                                   
                                   let posOffset = [objInstance.pos[0] - (difference/2), 
                                        objInstance.pos[1], objInstance.pos[2]];

                                   setPos(posOffset, unique);
                                   setDimTemp(rDimTemp, unique);
                              }}
                         ></i>
                    </div>

                    {/* User-input Controls */}
                    <div className='resizer-mid-x'>
                         <i 
                              className="fas fa-chevron-left"
                              onClick={() =>{
                                   let rVal = document.getElementById('width').value;
                                   let rDimTemp;
                                   if(scale === 'metric'){
                                        rDimTemp=[rVal/3, dimensions[1]/12,dimensions[2]/12];
                                   }else if(scale === 'imperial'){
                                        rDimTemp=[rVal/10, dimensions[1]/10,dimensions[2]/10];
                                   }
                                   console.log('Real-value = '+rVal);

                                   let difference = (rVal *4) - dimensions[0];
                                   console.log("Dimensions Difference: "+ difference);
                                   
                                   let posOffset = [objInstance.pos[0] - (difference/2), 
                                        objInstance.pos[1], objInstance.pos[2]];
                                   console.log("Position Offset is: "+ posOffset)

                                   setPos(posOffset, unique);
                                   setDimTemp(rDimTemp, unique);
                              }}
                         ></i>
                         <input 
                              className='resizer-input'
                              // defaultValue={actUnits[0]}
                              value={unitX}
                              onChange={(e) => setUnitX(e.target.value)}
                              // value={unitX.current}
                              // onChange={(e) => unitX.current = e.target.value}
                              id="width"
                         />
                         <i 
                              className="fas fa-chevron-right"
                              onClick={() =>{
                                   let rVal = document.getElementById('width').value;
                                   let rDimTemp;
                                   if(scale === 'metric'){
                                        rDimTemp=[rVal/3, dimensions[1]/12,dimensions[2]/12];
                                   }else if(scale === 'imperial'){
                                        rDimTemp=[rVal/10, dimensions[1]/10,dimensions[2]/10];
                                   }

                                   let difference = (rVal *4) - dimensions[0];
                                   
                                   let posOffset = [objInstance.pos[0] + (difference/2), 
                                        objInstance.pos[1], objInstance.pos[2]];

                                   setPos(posOffset, unique);
                                   setDimTemp(rDimTemp, unique);
                              }}
                         ></i>
                    </div>

                    {/* Right-side Controls */}
                    <div className='resizer-btn'>
                         <i 
                              className="fas fa-plus-square"
                              onClick={() =>{
                                   let rVal = unitX+1;
                                   let rDimTemp;
                                   if(scale === 'metric'){
                                        rDimTemp=[rVal/3, dimensions[1]/12,dimensions[2]/12];
                                   }else if(scale === 'imperial'){
                                        rDimTemp=[rVal/10, dimensions[1]/10,dimensions[2]/10];
                                   }

                                   let difference = (rVal *4) - dimensions[0];
                                   
                                   let posOffset = [objInstance.pos[0] + (difference/2), 
                                        objInstance.pos[1], objInstance.pos[2]];

                                   setPos(posOffset, unique);
                                   setDimTemp(rDimTemp, unique);
                              }}
                         ></i>
                         <i 
                              className="fas fa-minus-square"
                              onClick={() =>{
                                   let rVal = unitX-1;
                                   let rDimTemp;
                                   if(scale === 'metric'){
                                        rDimTemp=[rVal/3, dimensions[1]/12,dimensions[2]/12];
                                   }else if(scale === 'imperial'){
                                        rDimTemp=[rVal/10, dimensions[1]/10,dimensions[2]/10];
                                   }

                                   let difference = (rVal *4) - dimensions[0];
                                   
                                   let posOffset = [objInstance.pos[0] + (difference/2), 
                                        objInstance.pos[1], objInstance.pos[2]];

                                   setPos(posOffset, unique);
                                   setDimTemp(rDimTemp, unique);
                              }}
                         ></i>
                    </div>
               </div>

               {/* UI to modify z-axis (length) of the object */}
               <div className='float z-resizer'>
                    {/* Top Controls */}
                    <div className='resizer-btn'>
                         <i 
                              className="fas fa-plus-square"
                              onClick={() =>{
                                   let rVal = unitZ+1;
                                   let rDimTemp;
                                   if(scale === 'metric'){
                                        rDimTemp=[dimensions[0]/12, dimensions[1]/12, rVal/3];
                                   }else if(scale === 'imperial'){
                                        rDimTemp=[dimensions[0]/10, dimensions[1]/10, rVal/10];
                                   }

                                   let difference = (rVal *4) - dimensions[2];
                                   
                                   let posOffset = [objInstance.pos[0], objInstance.pos[1]
                                        , objInstance.pos[2] - (difference/2)];

                                   setPos(posOffset, unique);
                                   setDimTemp(rDimTemp, unique);
                              }}
                         ></i>
                         <i 
                              className="fas fa-minus-square"
                              onClick={() =>{
                                   let rVal = unitZ-1;
                                   let rDimTemp;
                                   if(scale === 'metric'){
                                        rDimTemp=[dimensions[0]/12, dimensions[1]/12, rVal/3];
                                   }else if(scale === 'imperial'){
                                        rDimTemp=[dimensions[0]/10, dimensions[1]/10, rVal/10];
                                   }

                                   let difference = (rVal *4) - dimensions[2];
                                   
                                   let posOffset = [objInstance.pos[0], objInstance.pos[1]
                                        , objInstance.pos[2] - (difference/2)];

                                   setPos(posOffset, unique);
                                   setDimTemp(rDimTemp, unique);
                              }}
                         ></i>
                    </div>

                    {/* User-input Controls */}
                    <div className='resizer-mid-z'>
                         <i 
                              className="fas fa-chevron-up"
                              onClick={() =>{
                                   let rVal = document.getElementById('length').value;
                                   let rDimTemp;
                                   if(scale === 'metric'){
                                        rDimTemp=[dimensions[0]/12, dimensions[1]/12, rVal/3];
                                   }else if(scale === 'imperial'){
                                        rDimTemp=[dimensions[0], dimensions[1]/10, rVal/10];
                                   }

                                   let difference = (rVal *4) - dimensions[2];
                                   console.log("Dimensions Difference: "+ difference);
                                   
                                   let posOffset = [objInstance.pos[0], objInstance.pos[1]
                                        , objInstance.pos[2] - (difference/2)];

                                   setPos(posOffset, unique);
                                   setDimTemp(rDimTemp, unique);
                              }}
                         ></i>
                         <input 
                              className='resizer-input'value={unitZ}
                              onChange={(e) => setUnitZ(e.target.value)}
                              id="length"
                         />
                         <i 
                              className="fas fa-chevron-down"
                              onClick={() =>{
                                   let rVal = document.getElementById('length').value;
                                   let rDimTemp;
                                   if(scale === 'metric'){
                                        rDimTemp=[dimensions[0]/12, dimensions[1]/12, rVal/3];
                                   }else if(scale === 'imperial'){
                                        rDimTemp=[dimensions[0], dimensions[1]/10, rVal/10];
                                   }

                                   let difference = (rVal *4) - dimensions[2];
                                   console.log("Dimensions Difference: "+ difference);
                                   
                                   let posOffset = [objInstance.pos[0], objInstance.pos[1]
                                        , objInstance.pos[2] + (difference/2)];

                                   setPos(posOffset, unique);
                                   setDimTemp(rDimTemp, unique);
                              }}
                         ></i>
                    </div>

                    {/* Bottom Controls */}
                    <div className='resizer-btn'>
                         <i 
                              className="fas fa-plus-square"
                              onClick={() =>{
                                   let rVal = unitZ+1;
                                   let rDimTemp;
                                   if(scale === 'metric'){
                                        rDimTemp=[dimensions[0]/12, dimensions[1]/12, rVal/3];
                                   }else if(scale === 'imperial'){
                                        rDimTemp=[dimensions[0]/10, dimensions[1]/10, rVal/10];
                                   }

                                   let difference = (rVal *4) - dimensions[2];
                                   
                                   let posOffset = [objInstance.pos[0], objInstance.pos[1]
                                        , objInstance.pos[2] + (difference/2)];

                                   setPos(posOffset, unique);
                                   setDimTemp(rDimTemp, unique);
                              }}
                         ></i>
                         <i 
                              className="fas fa-minus-square"
                              onClick={() =>{
                                   let rVal = unitZ-1;
                                   let rDimTemp;
                                   if(scale === 'metric'){
                                        rDimTemp=[dimensions[0]/12, dimensions[1]/12, rVal/3];
                                   }else if(scale === 'imperial'){
                                        rDimTemp=[dimensions[0]/10, dimensions[1]/10, rVal/10];
                                   }

                                   let difference = (rVal *4) - dimensions[2];
                                   
                                   let posOffset = [objInstance.pos[0], objInstance.pos[1]
                                        , objInstance.pos[2] + (difference/2)];

                                   setPos(posOffset, unique);
                                   setDimTemp(rDimTemp, unique);
                              }}
                         ></i>
                    </div>
               </div>
               <i 
                    className="float resizer-exit fas fa-check-circle"
                    onClick={()=>setResize('')}
               ></i>
          </div>
     )
}