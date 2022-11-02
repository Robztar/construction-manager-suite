import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// DELETE THIS LIB FROM NODE MODULES
import Pickr from '@simonwep/pickr';
import '@simonwep/pickr/dist/themes/nano.min.css'; 

// https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
//  - Ecosystem: List of libraries that may be useful:
     // GLTFs into JSX
     // Postprocessing (idk)
     // flexbox (idk)
     // zustand (STATE MANAGEMENT)
     // mouse/touch gestures (useDrag)
import { Html } from '@react-three/drei';
// https://stackoverflow.com/questions/69785504/how-to-add-a-jsx-component-inside-a-react-three-fiber-canvas
// - Helped with HTML inclusion
// - import { Html, ScrollControls, Scroll } from '@react-three/drei'

import { useStore } from '../hooks/objStore';
import * as textures from '../textures';

// ----- New Bug Alert ------
// 1. The Attribute window sticks with the object when the camera moves
     // only does this in ortho mode
     // possible solution: remove it using keyboard controls
// 2. On every state change, the state of colorAttr returns to default
     // Provide a way to set Color from
          // a) a type array
          // b) from objStore

// Up Next:
     // 1. Default color picker is weird... try 
          // a) fix it (maybe impossible)
          // b) use basic calor panels to choose from
     // 2. Enable textures for objects (+add its GUI)
     // 3. Increase objects catalogue (+add to options)
     // 4. Increase textures catalogue
     // 5. Implement measurement scale
     // 6. Readjust object sizing and positioning (to scale)
     // 7. Make 'Attribute' an external component:
          // i) Convert all local variables to obj properties     
          // ii) Add it under the same umbrella where the obj is created on edit page
     // 8. Create mini-attribute modifier on click, rather than full attribute menu
     // 8. Implement saveState to local computer

export const Obj = ({ setShape, unique}) =>{
     const ref = useRef();

     const [objects, setPos, changeColor, changeTexture, setActive, removeObj] = useStore((state) => [
          state.objects,
          state.setPos,
          state.changeColor,
          state.changeTexture,
          state.setActive,
          state.removeObj,
     ]);
     
     let objInstance = objects.find(o => o.key === unique);

     let prevPos = [0,0,0];
     // let objColor = 'blue';
     if (objInstance) prevPos = objInstance.pos;
     var mouseLoc = {x:prevPos[0], y:prevPos[1], z:prevPos[2]};

     const allColors = {
          box : 'red',
          sphere : 'blue'
     }
     const allShapes = {
          box : new THREE.BoxBufferGeometry(1,1,1),
          sphere : new THREE.SphereBufferGeometry(0.5,16,16)
     }
     
     const Attribute = () =>{
          let colorAttr = objInstance.color;
          let textureAttr = objInstance.texture;
          const [colorMenu, setColMenu] = useState(false);
          // let colorMenu = false;

          return(
               <div 
                    className='float attr-cont'
                    style={{'display': objInstance.active}}
               >
                    <div className="attr-head">
                         <h3 className='attr-title'>
                              Attribute Menu
                         </h3>
                         <div 
                              className='attr-exit'
                              onClick={()=>setActive('')}
                         >
                              X</div>
                    </div>
                    <div className='attr-menu'>
                         {/* Color menu (CALLAPSED for readability) */}
                         <div 
                              className={`attr-li ${colorMenu ? 'active' : ''}`}
                              style={{'grid-template-columns': '1fr'}}
                              onClick={(e) =>{
                                   e.stopPropagation();
                                   setColMenu(!colorMenu);
                                   console.log('Menu active: ' + colorMenu);
                              }}
                         >
                              {colorMenu ? 
                                   <div className='color-li'>
                                        {/* Reserve Row for attribute control */}
                                        <div>Name - Close</div>
                                        {/* Tint Row */}
                                        <div className='color-row tint'>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': 'white'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = 'white';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': '#BFBFBF'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = '#BFBFBF';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': '#808080'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = '#808080';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': '#404040'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = '#808080';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': 'black'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = 'black';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                        </div>
                                        {/* Red Row */}
                                        <div className='color-row red'>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': '#FFCCCC'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = '#FFCCCC';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': '#FF6666'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = '#FF6666';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': 'red'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = '#FF0000';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': '#990000'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = '#990000';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': '#330000'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = '#330000';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                        </div>

                                        {/* Orange Row */}
                                        <div className='color-row orange'>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': 'orange'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = 'orange';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                        </div>

                                        {/* Yellow Row */}
                                        <div className='color-row yellow'>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': 'yellow'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = 'yellow';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                        </div>

                                        {/* Lime Row */}
                                        <div className='color-row lime'>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': 'lime'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = 'lime';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                        </div>

                                        {/* Aqua Row */}
                                        <div className='color-row aqua'>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': '#CCFFE5'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = '#CCFFE5';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': '#66FFB2'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = '#66FFB2';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': '#00FF80'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = '#00FF80';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': '#00994C'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = '#00994C';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': '#003319'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = '#003319';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                        </div>

                                        {/* Cyan Row */}
                                        <div className='color-row cyan'>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': 'cyan'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = 'cyan';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                        </div>

                                        {/* Blue Row */}
                                        <div className='color-row blue'>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': 'blue'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = 'blue';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                        </div>

                                        {/* Purple Row */}
                                        <div className='color-row purple'>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': 'purple'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = 'purple';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                        </div>

                                        {/* Magenta Row */}
                                        <div className='color-row magenta'>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': 'magenta'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = 'magenta';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                        </div>

                                        {/* Pink Row */}
                                        <div className='color-row pink'>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': '#FFCCE5'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = '#FFCCE5';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': '#FF66B2'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = '#FF66B2';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': '#FF007F'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = '#FF007F';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': '#99004C'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = '#99004C';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                             <div 
                                                  className='color-t' 
                                                  style={{'background': '#330019'}}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       colorAttr = '#330019';
                                                       changeColor(colorAttr, unique);
                                                       changeTexture('blank', unique);
                                                       ref.current.material.color.set(objInstance.color);
                                                       console.log('current color is: ' + objInstance.color);
                                                  }}
                                             ></div>
                                        </div>
                                   </div>
                                   : <div className='attr-n'>Colors</div>}
                         </div>

                         {/* ----Adding Textures---- */}
                         <div className={`attr-li ${colorMenu ? 'inactive' : ''}`}
                              onClick={(e) =>{
                                   e.stopPropagation();
                                   // console.log('current color is: ' + objInstance.color);
                              }}
                         >
                              <div className='attr-n'>Texture</div>
                              <div 
                                   className='attr-t attr-texture' 
                                   // style={{'background': 'red'}}
                                   onClick={(e) =>{
                                        e.stopPropagation();
                                        colorAttr = 'white';
                                        changeColor(colorAttr, unique);
                                        changeTexture('wood', unique);
                                        console.log('current texture is: ' + textureAttr);
                                   }}
                                   ></div>
                         </div>
                         
                    </div>
                    <div className='attr-footer'>
                         <div 
                              className='attr-n obj-remove'
                              onClick={() => removeObj(prevPos)}
                         >R</div>
                    </div>
               </div>
          )
     }

     // Mouse-move Funtionality
     function onMouseMove(event) {
          if(objInstance.ortho){
               mouseLoc.x = (event.clientX / window.innerWidth) * 2 - 1;
               mouseLoc.z = - (event.clientY / window.innerHeight) * 2 + 1;
     
               mouseLoc.x = Math.round(mouseLoc.x * window.innerWidth* 1.25)/100;
               mouseLoc.z = Math.round(mouseLoc.z * window.innerHeight *-1.25)/100;
     
               // Grid-locking can be made optional
               mouseLoc.x = Math.round(mouseLoc.x);
               mouseLoc.z = Math.round(mouseLoc.z);
               // Can also create a movement limiter based on grid (and Ground) size
          }
     }

     useFrame((state) => {
          ref.current.position.set(mouseLoc.x, mouseLoc.y, mouseLoc.z);
     });

     if (objInstance) {
          // console.log('Pos still here: ' + objInstance.pos);
          return (
               <>
                    <mesh 
                         ref = {ref}
                         className={'object-box'}
                         onPointerDown={(event) =>{
                              event.stopPropagation();
                              document.addEventListener('mousemove', onMouseMove);
                         }} 
                         onPointerUp={(event) =>{
                              event.stopPropagation();
                              document.removeEventListener('mousemove',onMouseMove);
                              var [x,y,z] = [mouseLoc.x,mouseLoc.y,mouseLoc.z];
                              console.log('key I try to use: ' + unique);
                              setPos([x,y,z], unique);
                         }}
                         onClick={() => {
                              setActive(unique);
                         }}
                    >
                         <primitive object={allShapes[setShape]} attach="geometry" />
                         <meshStandardMaterial attach="material" color={objInstance.color} map={textures[objInstance.texture]} />
                         {/* <meshStandardMaterial attach="material" color={allColors[setShape]} /> */}
                    </mesh>
                    <Html>
                         <Attribute />
                    </Html>
               </>
               
          );
     } else{
          // console.log('Pos has left the chat');
          return null;
     }
}

// Buggy input-type:color implementation
//<div className='attr-li'>
// <label className='attr-n' htmlFor='color-input'> Color </label>
// <input 
//           className='attr-t'
//           id='color-input'
//           type={'color'} 
//           // value={colorAttr} 
//           value={objInstance.color} 
//           onChange={(e) =>{
//                colorAttr = e.target.value;
//                ref.current.material.color.set(colorAttr);
//           }}
//           // onChange={function(e){
//           //      colorAttr = e.target.value;
//           //      ref.current.material.color.set(colorAttr);
//           // }}
//      />
// </div>
// <div className='attr-li'
//      onClick={(e) =>{
//           e.stopPropagation();
//           changeColor(colorAttr, unique);
//           console.log('current color is: ' + objInstance.color);
//      }}
// >Submit
// </div>
// <div className='attr-li'
//      onClick={(e) =>{
//           e.stopPropagation();
//           // changeColor(colorAttr, unique);
//           ref.current.material.color.set(objInstance.color);
//           console.log('current color is: ' + objInstance.color);
//      }}
// >Cancel
// </div>