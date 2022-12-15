import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
// import { useState, useEffect } from 'react';
import * as THREE from 'three';

import { MinSelect } from './MinSelect';
import { Resizer } from './Resizer';

import { Floor } from './Floor';
import { Wall } from './Wall';

import { useStore } from '../../hooks/objStore';

export const Room = ({ unique }) =>{
     const ref = useRef();
     const [ objects, projects, ortho,
          setPos, 
          setActive,
     ] = 
     useStore((state) => [ state.objects, state.projects, state.ortho,
          state.setPos,
          state.setActive,
     ]);
     
     let objInstance = objects.find(o => o.key === unique);
     let scale;
     let conversion;

     let prevPos = [0,0,0];

     if(objInstance){
          let projInstance = projects.find(p => p.key === objInstance.projId);
          scale = projInstance.scale;
          conversion = projInstance.conversion;

          prevPos = objInstance.pos;
          prevPos[1] = 0;
     }

     let mouseLoc = {x:prevPos[0], y:prevPos[1], z:prevPos[2]};

     // Mouse-move Funtionality
     function onMouseMove(event) {
          if(ortho){
               mouseLoc.x = (event.clientX / window.innerWidth) * 2 - 1;
               mouseLoc.z = - (event.clientY / window.innerHeight) * 2 + 1;
     
               mouseLoc.x = Math.round(mouseLoc.x * window.innerWidth* 1.25)/100;
               mouseLoc.z = Math.round(mouseLoc.z * window.innerHeight *-1.25)/100;
     
               // Grid-locking can be made optional
               // mouseLoc.x = Math.round(mouseLoc.x);
               // mouseLoc.z = Math.round(mouseLoc.z);
               mouseLoc.x = +mouseLoc.x.toFixed(1);
               mouseLoc.z = +mouseLoc.z.toFixed(1);
               // Can also create a movement limiter based on grid (and Ground) size

               // Metric Scale
               if(scale === 'metric'){
                    mouseLoc.x *= 4;
                    mouseLoc.z *= 4;
               }else{
                    mouseLoc.x *= 2;
                    mouseLoc.z *= 2;
               }
          }
     }

     useFrame((state) => {
          ref.current.position.set(mouseLoc.x, mouseLoc.y, mouseLoc.z);
     });

     const toggleActive = () =>{
          if(objInstance.active === 'none'){
               setActive(unique);
          }else{
               setActive('');
          }
     }

     // --------- Up Next ----------
     // 4. Have modes for Attribute Menu
          // a. [DONE] Rooms (and maybe for walls as well)
          // b. Models
     // 10. Fix object movement (off center)
          // a. If the orthographic camera is moved,
          // b. ... the object is offset from the cursor
          // c. Possible solution: Try "raycaster".
          // d. Other Solution: ScreenX (/Y):
               // https://extendscript.docsforadobe.dev/user-interface-tools/event-handling.html#screenx-and-screeny


     if (objInstance) {
          let rotY = THREE.Math.degToRad(objInstance.rotationY);
          return (
               <group
                    ref = {ref}
                    rotation={[0,rotY,0]}
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
                         toggleActive();
                    }}
               >
                    {/* Ceiling - off on ortho mode */}
                    {ortho? null:
                         <Floor 
                              instance={objInstance}
                              unique={unique}
                              conversion={conversion}
                              scale={scale}
                              ortho={ortho}
                              height={objInstance.wallDimTempY[0]}
                         />
                    }
                    {/* Floor */}
                    <Floor
                         instance={objInstance}
                         unique={unique}
                         conversion={conversion}
                         scale={scale}
                         ortho={ortho}
                         height={0}
                    />
                    {/* Left */}
                    <Wall
                         instance={objInstance}
                         unique={unique}
                         rotY={0}
                         conversion={conversion}
                         scale={scale}
                         ortho={ortho}
                         wallNo={0}
                    />

                    {/* Right */}
                    <Wall
                         instance={objInstance}
                         unique={unique}
                         rotY={0}
                         conversion={conversion}
                         scale={scale}
                         ortho={ortho}
                         wallNo={1}
                    />
                    
                    {/* Bottom */}
                    <Wall
                         instance={objInstance}
                         unique={unique}
                         rotY={Math.PI/2}
                         conversion={conversion}
                         scale={scale}
                         ortho={ortho}
                         wallNo={2}
                    />
                    
                    {/* Top */}
                    <Wall
                         instance={objInstance}
                         unique={unique}
                         rotY={Math.PI/2}
                         conversion={conversion}
                         scale={scale}
                         ortho={ortho}
                         wallNo={3}
                    />
                    
                    <Html>
                         <MinSelect unique={unique} instance={objInstance} />
                         <Resizer unique={unique} instance={objInstance} />
                    </Html>
               </group>
          );
     } else{
          // console.log('Left the chat');
          return null;
     }
}