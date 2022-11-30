import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
// Threejs GLTF support:
     // https://www.youtube.com/watch?v=WBe3xrV4CPM
     // import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
//  - Ecosystem: List of libraries that may be useful:
     // GLTFs into JSX
     // Postprocessing (idk)
     // flexbox (idk)
     // zustand (STATE MANAGEMENT)
     // mouse/touch gestures (useDrag)

// import { Html, ScrollControls, Scroll } from '@react-three/drei'

import { useStore } from '../hooks/objStore';
import * as textures from '../textures';

// ----- Bug Alert ------
// 1. The Attribute window sticks with the object when the camera moves
     // only does this in ortho mode
     // 7. Make 'Attribute' an external component:
          // i) Convert all local variables to obj properties     
          // ii) Add it under the same umbrella where the obj is created on edit page

// Up Next:
     // 1. Build a room functionality
     // 2. Create mini-attribute modifier on click, rather than full attribute menu
     // 3. Implement saveState to local computer
     // 4. Implement remove State from local computer
     // 5. Increase objects catalogue (+add to options)
     // 6. Fix texture mapping on objects
     // 7. Increase textures catalogue

export const Obj = ({ setShape, unique}) =>{
     const ref = useRef();

     const [ objects, conv, scale, ortho,
          setPos, 
          setActive,
     ] = useStore((state) => [ state.objects, state.conv, state.scale, state.ortho,
          state.setPos,
          state.setActive,
     ]);
     
     let objInstance = objects.find(o => o.key === unique);

     // Measurement Scale
     let prevPos = [0,0,0];
     let allShapes;
     let conversion = conv
     let dimensions;
     let ground = -0.5;
     // let actUnits;

     if (objInstance) {
          prevPos = objInstance.pos;
          dimensions = [
               objInstance.dimTemp[0]*conversion,
               objInstance.dimTemp[1]*conversion,
               objInstance.dimTemp[2]*conversion
          ];
          prevPos[1] = (dimensions[1]/2)+ground;
          // console.log(prevPos[1]);

          // More Geometry types
          // https://threejs.org/docs/index.html?q=Geometry#api/en/geometries/CylinderGeometry
          if(scale === 'metric'){
               allShapes = {
                    box : new THREE.BoxBufferGeometry(dimensions[0],dimensions[1],dimensions[2]),
                    // box : new THREE.BoxBufferGeometry(12,12,12),
                    sphere : new THREE.SphereBufferGeometry(0.5,16,16),
                    cylinder : new THREE.CylinderBufferGeometry(0.5,0.5,1,30),
               }
               // actUnits = [dimensions[0]/4,dimensions[1]/4,dimensions[2]/4];
          }
          else if (scale === 'imperial'){
               allShapes = {
                    box : new THREE.BoxBufferGeometry(dimensions[0],dimensions[1],dimensions[2]),
                    // box : new THREE.BoxBufferGeometry(10,10,10),
                    sphere : new THREE.SphereBufferGeometry(0.5,16,16),
                    cylinder : new THREE.CylinderBufferGeometry(0.5,0.5,1,30),
               }
               // actUnits = [dimensions[0],dimensions[1],dimensions[2]];
          }
     }

     let mouseLoc = {x:prevPos[0], y:prevPos[1], z:prevPos[2]};

     // const allColors = {
     //      box : 'red',
     //      sphere : 'blue'
     // }

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
                         <meshStandardMaterial 
                              attach="material" 
                              color={objInstance.color} 
                              map={textures[objInstance.texture]}
                              opacity={objInstance.texture === 'glass'? 0.6 : 1}
                              transparent={true}
                         />
                         {/* <meshStandardMaterial attach="material" color={allColors[setShape]} /> */}
                    </mesh>
               </>
               
          );
     } else{
          // console.log('Pos has left the chat');
          return null;
     }
}