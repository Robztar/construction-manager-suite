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

export const Obj = ({ isOrtho, setShape, pos, texture, nkey, unique}) =>{
     const ref = useRef();

     const [objects, setPos, setActive, setNotActive, removeObj] = useStore((state) => [
          state.objects,
          state.setPos,
          state.setActive,
          state.setNotActive,
          state.removeObj,
     ]);
     
     let objInstance = objects.find(o => o.key === unique);
     let prevPos = objInstance.pos;

     const Attribute = ({rem}) =>{
          // R3F mouse events
          // https://docs.pmnd.rs/react-three-fiber/api/events
          return(
               <div 
                    className='float attr-cont'
                    style={{'display': objInstance.active}}
                    // onPointerLeave={() => 
                    //      document.addEventListener('click', () =>
                    //                // alert('missed')
                    //                console.log('missed')
                    //      )
                    // }
               >
                    <h3 className='attr-title'>
                         Attribute Menu
                    </h3>
                    <div className='attr-menu'>
                         <div className='attr-n obj-remove'>
                              Remove
                         </div>
                         <div 
                              className='attr-li' 
                              onClick={()=>{
                              // changeColor
                                   ref.current.material.color.set('blue');
                              }}
                         >
                              <div className='attr-n'>
                                   Color
                              </div>
                              <div className='attr-t'></div>
                         </div>
                    </div>
               </div>
          )
     }

     
     
     console.log('The objects active state is: '+ objInstance.active);

     var mouseLoc = {x:prevPos[0], y:prevPos[1], z:prevPos[2]};

     // Mouse-move Funtionality
     function onMouseMove(event) {
          if(isOrtho){
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

     const allColors = {
          box : 'red',
          sphere : 'blue'
     }
     const allShapes = {
          box : new THREE.BoxBufferGeometry(1,1,1),
          sphere : new THREE.SphereBufferGeometry(0.5,16,16)
     }
     useFrame((state) => {
          ref.current.position.set(mouseLoc.x, mouseLoc.y, mouseLoc.z);
     });

     return (
          <>
               <mesh 
                    ref = {ref}
                    className={'object-box'}
                    onPointerDown={(event) =>{
                         event.stopPropagation();
                         document.addEventListener('mousemove', onMouseMove);
                         // document.getElementsByClassName("attr-cont")[0].style.display = 'flex';
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
                    // This has a weird bug... maybe use the attribute menu instead.
                    // attribute menu does weird shit for removeObj tho.. -_-
                    // onPointerMissed={() => setNotActive(unique)}
               >
                    <primitive object={allShapes[setShape]} attach="geometry" />
                    <meshStandardMaterial attach="material" color={allColors[setShape]} />
               </mesh>
               <Html>
                    <Attribute />
               </Html>
          </>
     );
}