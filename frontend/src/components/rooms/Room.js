import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
// import { useState, useEffect } from 'react';

import { MinSelect } from './MinSelect';
import { Resizer } from './Resizer';

import { Floor } from './Floor';
import { Wall } from './Wall';


// import React, { useState, useRef, useEffect } from 'react';
// import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three';

import { useStore } from '../../hooks/objStore';

// ---- The Plan ----
// -New Wall attributes in objStore
// -Map wall pos to floor sides
     // leftWall.posX = floorPosX - (floorWidth / 2)
     // rightWall.posX = floorPosX + (floorWidth / 2)
     // sideWall.posZ = floorPosZ

     // topWall.posZ = floorPosZ + (floorLength / 2)
     // bottomWall.posZ = floorPosZ - (floorLength / 2)
     // endWall.posX = floorPosX

export const Room = ({ setShape, unique}) =>{
     const ref = useRef();
     const [ objects, conv, scale, ortho,
          setPos, 
          setActive,
     ] = 
     useStore((state) => [ state.objects, state.conv, state.scale, state.ortho,
          state.setPos,
          state.setActive,
     ]);
     
     let objInstance = objects.find(o => o.key === unique);
     let conversion = conv;

     let prevPos = [0,0,0];
     // let ground = -0.5;

     // let dimensions = [
     //      objInstance.dimTemp[0]*conversion,
     //      objInstance.dimTemp[1]*conversion,
     //      objInstance.dimTemp[2]*conversion
     // ];
     if(objInstance){
          prevPos = objInstance.pos;
          prevPos[1] = 0;
          // elevation = objInstance.dimTemp[1]*conversion;
          // prevPos[1] = (elevation/2)+ground;     //lift off the ground
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
               mouseLoc.x = Math.round(mouseLoc.x);
               mouseLoc.z = Math.round(mouseLoc.z);
               // Can also create a movement limiter based on grid (and Ground) size

               // Metric Scale
               mouseLoc.x *= 4;
               mouseLoc.z *= 4;
          }
     }

     useFrame((state) => {
          ref.current.position.set(mouseLoc.x, mouseLoc.y, mouseLoc.z);
          // console.log("mouseLoc: " + mouseLoc.z);
     });

     const toggleActive = () =>{
          if(objInstance.active === 'none'){
               setActive(unique);
          }else{
               setActive('');
          }
     }

     // --------- Up Next ----------
     // 1. [DONE] Implement Room Attribute System
          // [DONE] a. MinSelect b. Resizer c. Attribute Menu
     // 2. [DONE]Implement room sizing via:
          // [DONE] a. Resizer b. Attribute Menu
     // 3. [DONE] Create a system for resizing directionally
          // [DONE]a. Resize to the left/right b. Resize to the top/bottom
     // 4. Have modes for Attribute Menu
          // a. [DONE] Rooms (and maybe for walls as well)
          // b. Models
          // c. Objects
     // 5. Update Attribute Menu Design
          // [DONE] Set Tile design for Properties that Can be opened [DONE] Width/Length value units (cm, mm, in, fractions)
          // Implement Rotation
          // Show texture color
          // Show the Object Name being updated
     // 6. [DONE] Allow adding windows/doors
          // [DONE]a. Use either objects or models b. make them visible and changeable from ortho mode
     // 7. Create New Menu for:
          // Save/Reset Page
          // Page metric/imperial scaling
     // 8. Implement Timed saves
     // 9. Fix object movement in Imperial mode
     // 10. Fix object movement (off center)
          // a. If the orthographic camera is moved,
          // b. ... the object is offset from the cursor
          // c. Possible solution: Try "raycaster".
          // d. Other Solution: ScreenX (/Y):
               // https://extendscript.docsforadobe.dev/user-interface-tools/event-handling.html#screenx-and-screeny


     if (objInstance) {
          return (
               <group
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
                         // setActive(unique);
                         toggleActive();
                    }}
               >
                    {/* Ceiling (soon) - off on ortho mode */}
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
                    {/* if(!ortho){
                         <Floor 
                              instance={objInstance}
                              unique={unique}
                              conversion={conversion}
                              scale={scale}
                              ortho={ortho}
                              height={objInstance.wallDimTempY[0]}
                         />
                    } */}
                    
                    {/* <Ceil
                         instance={objInstance}
                         unique={unique}
                         conversion={conversion}
                    /> */}
                    {/* Floor */}
                    <Floor
                         instance={objInstance}
                         unique={unique}
                         conversion={conversion}
                         scale={scale}
                         ortho={ortho}
                         height={1}
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