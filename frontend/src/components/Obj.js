import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
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

// ----- New Bug Alert ------
// 1. The Attribute window sticks with the object when the camera moves
     // only does this in ortho mode
     // possible solution: remove it using keyboard controls
// 2. On every state change, the state of colorAttr returns to default
     // Provide a way to set Color from
          // a) a type array
          // b) from objStore

// Up Next:
     // 1. Connect color attribute to store
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

     const [objects, setPos, setActive, removeObj] = useStore((state) => [
          state.objects,
          state.setPos,
          state.setActive,
          state.removeObj,
     ]);
     
     let objInstance = objects.find(o => o.key === unique);

     let prevPos = [0,0,0];
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
          const [colorAttr, setColor] = useState('#ff0000');

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
                         <div className='attr-li'>
                              <label className='attr-n' for='color-input'> Color </label>
                              <input 
                                   className='attr-t'
                                   id='color-input'
                                   type={'color'} 
                                   value={colorAttr} 
                                   onChange={function(e){
                                        setColor(e.target.value);
                                        ref.current.material.color.set(colorAttr);
                                   }}
                              />
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
                         <meshStandardMaterial attach="material" color={allColors[setShape]} />
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