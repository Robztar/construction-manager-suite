import React, { useState, useRef, useEffect } from 'react';
// import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

import { Fixtures } from './Fixtures';

import { useStore } from '../../hooks/objStore';
import * as textures from '../../textures';

export const Wall = ({ ...props }) =>{
     const ref = useRef();
     const unique = props.unique;
     const objInstance = props.instance;
     const conversion = props.conversion;
     const rotY = props.rotY;
     const scale = props.scale;
     const ortho = props.ortho;
     const wallNo = props.wallNo;

     // Wall Attribute Menu
          // Different Attrubute menu access method
          // Change Texture, Change Thickness
     // Wall Fixtures Menu
          // Add new fixtures
          // Show types of Fixtures attached
          // Show each attached fixture under each fixture type
          // Allow updating each fixture type

     // Convert to wall-properties
          // Different Attribute Menu
          // Diff dimensions
          // Diff colors and textures
     const [ fixtures,
          setActiveWallNo,
          setWallPos,
     ] = useStore((state) => [ state.fixtures,
          state.setActiveWallNo,
          state.setWallPos,
     ]);

     // Fixtures Management
     let fixInstances = fixtures.filter(e => e.objId === unique);
     // console.log("Fixture Instance = "+ fixInstances);

     // Wall width (thickness) = 8in = 20.32cm = 0.203m (dimTemp = 0.068)
     let dimensions = [
          objInstance.wallDimTempX[wallNo]*conversion, //thickness
          objInstance.wallDimTempY[wallNo]*conversion, //height
          objInstance.wallDimTempZ[wallNo]*conversion, //length
     ];
     let viewedHeight = dimensions[1];
     

     // Measurement Scale
     let box;
     let ground = -0.5;
     if(ortho){
     // if(wallNo === 2){
     // if(wallNo === 0){
          viewedHeight /= 2;
          // ground *=6;
          // viewedHeight = 2;
          ground *=6;
     }

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
     
     // console.log("Wall No: "+wallNo+", Prev (Active) Pos: "+prevPos);
     // console.log("Wall Angle: "+rotY);
     prevPos[1] = (dimensions[1]/2)+ground;  //lift off the ground

     if(scale === 'metric'){
          box = new THREE.BoxBufferGeometry(dimensions[0],viewedHeight,dimensions[2]);
     }else if (scale === 'imperial'){
          box = new THREE.BoxBufferGeometry(dimensions[0],viewedHeight,dimensions[2]);
     }

     let wallColor = objInstance.wallColor[wallNo];
     let wallTexture = objInstance.wallTexture[wallNo];

     const WallNoDisp = () =>{
          let activeWallNo = objInstance.activeWallNo;
          let activate;
          if(activeWallNo === wallNo){
               activate = 'rgba(0, 221, 255, 0.7)';
          }else{
               activate = 'rgba(0, 221, 255, 0.2)';
          }

          return(
               <div
                    className='float wall-num'
                    style={{'display': objInstance.wallMenu,
                         'background': activate
                    }}
               >{wallNo+1}</div>
          )
     }



     return (
          <group
               position={prevPos}
               rotation={[0,rotY,0]}
          >
               <mesh 
                    // ref = {ref}

                    // position={prevPos}
                    // rotation={[0,rotY,0]}

                    // onClick={() => {
                    //      toggleWallActive();
                    // }}
               >
                    <primitive object={box} attach="geometry" />
                    <meshStandardMaterial 
                         attach="material" 
                         color={wallColor}
                         map={textures[wallTexture]}
                         opacity={wallTexture === 'glass'? 0.6 : 1}
                         transparent={true}
                    />
                    
                    <Html>
                         <WallNoDisp />
                    </Html>
               </mesh>
               {fixInstances.map(({key, wallNum, type}) =>{
                    if(wallNum === wallNo){
                         return(
                              <Fixtures 
                                   key={key}
                                   fixId={key}
                                   objInstance={objInstance}
                                   wallNo={wallNo}
                                   ortho={ortho}
                                   conversion={conversion}
                              />
                         )
                    }
                    return null;
               })}
          </group>
     )
}