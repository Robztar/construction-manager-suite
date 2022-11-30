import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { useStore } from '../hooks/objStore';
import * as textures from '../textures';

export const Wall = ({ ...props }) =>{
     const ref = useRef();
     const unique = props.unique;
     const objInstance = props.instance;
     const conversion = props.conversion;
     const rotY = props.rotY;
     const scale = props.scale;
     const ortho = props.ortho;
     const wallNo = props.wallNo;

     // Convert to wall-properties
          // Different Attricute Menu
          // Diff dimensions
          // Diff colors and textures
     const [ 
          changeColor, 
          changeTexture, 
          setActive, 
          removeObj, 
          setTextureMenu, 
          setTextureOptions, 
          setMatType,
          setDimTemp,
          setWallPos,
     ] = useStore((state) => [
          state.changeColor,
          state.changeTexture,
          state.setActive,
          state.removeObj,
          state.setTextureMenu,
          state.setTextureOptions,
          state.setMatType,
          state.setDimTemp,
          state.setWallPos,
     ]);

     // Wall width (thickness) = 8in = 20.32cm = 0.203m (dimTemp = 0.068)
     let dimensions = [
          objInstance.wallDimTempX[wallNo]*conversion, //thickness
          objInstance.wallDimTempY[wallNo]*conversion, //height
          objInstance.wallDimTempZ[wallNo]*conversion, //length
     ];

     // Measurement Scale
     let box;
     let ground = -0.5;

     let wallPos = [0,0,0];
     if(wallNo === 0){        //LEFT - x
          wallPos[0] -= objInstance.dimTemp[0]*conversion / 2;
          dimensions[2] = objInstance.dimTemp[2]*conversion;
     }else if(wallNo === 1){  //RIGHT - x
          wallPos[0] += (objInstance.dimTemp[0]*conversion) / 2;
          dimensions[2] = objInstance.dimTemp[2]*conversion;
     }else if(wallNo === 2){  //TOP - z
          wallPos[2] += (objInstance.dimTemp[2]*conversion) / 2;
          dimensions[2] = objInstance.dimTemp[0]*conversion;
     }else if(wallNo === 3){  //BOTTOM - z
          wallPos[2] -= (objInstance.dimTemp[2]*conversion) / 2;
          dimensions[2] = objInstance.dimTemp[0]*conversion;
     }
     
     wallPos[1] = objInstance.pos[1];

     let prevPos = wallPos;
     
     console.log("Wall No: "+wallNo+", Prev (Active) Pos: "+prevPos);
     console.log("Wall Angle: "+rotY);
     prevPos[1] = (dimensions[1]/2)+ground;  //lift off the ground

     // let mouseLoc = {x:prevPos[0], y:prevPos[1], z:prevPos[2]};

     if(scale === 'metric'){
          box = new THREE.BoxBufferGeometry(dimensions[0],dimensions[1],dimensions[2]);
     }else if (scale === 'imperial'){
          box = new THREE.BoxBufferGeometry(dimensions[0],dimensions[1],dimensions[2]);
     }

     // Mouse-move Funtionality
     // function onMouseMove(event) {
     //      if(ortho){
     //           mouseLoc.x = (event.clientX / window.innerWidth) * 2 - 1;
     //           mouseLoc.z = - (event.clientY / window.innerHeight) * 2 + 1;
     
     //           mouseLoc.x = Math.round(mouseLoc.x * window.innerWidth* 1.25)/100;
     //           mouseLoc.z = Math.round(mouseLoc.z * window.innerHeight *-1.25)/100;
     
     //           // Grid-locking can be made optional
     //           // mouseLoc.x = Math.round(mouseLoc.x);
     //           // mouseLoc.z = Math.round(mouseLoc.z);
     //           // Can also create a movement limiter based on grid (and Ground) size

     //           // Metric Scale
     //           mouseLoc.x *= 4;
     //           mouseLoc.z *= 4;
     //           prevPos = [mouseLoc.x,mouseLoc.y,mouseLoc.z];
     //      }
     // }

     // useFrame((state) => {
     //      ref.current.position.set(mouseLoc.x, mouseLoc.y, mouseLoc.z);
     // });

     return (
          <>
               <mesh 
                    // ref = {ref}
                    position={prevPos}
                    rotation={[0,rotY,0]}
                    // className={'object-box'}
                    // onPointerDown={(event) =>{
                    //      event.stopPropagation();
                    //      document.addEventListener('mousemove', onMouseMove);
                    // }} 
                    // onPointerUp={(event) =>{
                    //      event.stopPropagation();
                    //      document.removeEventListener('mousemove',onMouseMove);
                    //      // var [x,y,z] = [mouseLoc.x,mouseLoc.y,mouseLoc.z];
                    //      // prevPos = [mouseLoc.x,mouseLoc.y,mouseLoc.z];
                    //      // posOfWalls[wallNo] = prevPos;
                    //      console.log('key I try to use: ' + unique);
                    //      // setWallPos(posOfWalls, unique);
                    // }}
                    // onClick={() => {
                    //      setActive(unique);
                    // }}
               >
                    <primitive object={box} attach="geometry" />
                    <meshStandardMaterial 
                         attach="material" 
                         color={objInstance.color} 
                         map={textures[objInstance.texture]}
                         opacity={objInstance.texture === 'glass'? 0.6 : 1}
                         transparent={true}
                    />
               </mesh>
          </>
     )
}