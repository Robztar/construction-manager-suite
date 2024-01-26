import React from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

import { Fixtures } from './Fixtures';

import { useStore } from '../../hooks/objStore';
import * as textures from '../../textures';

export const Wall = ({ ...props }) =>{
     const unique = props.unique;
     const objInstance = props.instance;
     const conversion = props.conversion;
     const rotY = props.rotY;
     const scale = props.scale;
     const ortho = props.ortho;
     const wallNo = props.wallNo;

     const [ fixtures ] = useStore((state) => [ state.fixtures ]);

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
     
     // if(wallNo === 2){
     // if(wallNo === 0){
     if(ortho){
          viewedHeight /= 2;
          ground *=6;
     }

     let wallPos = [0,0,0];
     if(wallNo === 0){        //LEFT - x
          wallPos[0] -= objInstance.dimTemp[0]*conversion / 2;
          wallPos[0] += objInstance.wallDimTempX[wallNo]*conversion / 2.1;
          dimensions[2] = objInstance.dimTemp[2]*conversion;
     }else if(wallNo === 1){  //RIGHT - x
          wallPos[0] += (objInstance.dimTemp[0]*conversion) / 2;
          wallPos[0] -= objInstance.wallDimTempX[wallNo]*conversion / 2.1;
          dimensions[2] = objInstance.dimTemp[2]*conversion;
     }else if(wallNo === 2){  //TOP - z
          wallPos[2] += (objInstance.dimTemp[2]*conversion) / 2;
          wallPos[2] -= objInstance.wallDimTempX[wallNo]*conversion / 2.1;
          dimensions[2] = objInstance.dimTemp[0]*conversion;
     }else if(wallNo === 3){  //BOTTOM - z
          wallPos[2] -= (objInstance.dimTemp[2]*conversion) / 2;
          wallPos[2] += objInstance.wallDimTempX[wallNo]*conversion / 2.1;
          dimensions[2] = objInstance.dimTemp[0]*conversion;
     }
     
     wallPos[1] = objInstance.pos[1];

     let prevPos = wallPos;
     
     prevPos[1] = (dimensions[1]/2)+ground;  //lift off the ground

     if(scale === 'metric'){
          box = new THREE.BoxGeometry(dimensions[0],viewedHeight,dimensions[2]);
     }else if (scale === 'imperial'){
          box = new THREE.BoxGeometry(dimensions[0],viewedHeight,dimensions[2]);
     }

     let wallColor = objInstance.wallColor[wallNo];
     let wallTexture = textures[objInstance.wallTexture[wallNo]];
     wallTexture.repeat.set(viewedHeight,dimensions[2]);

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
               <mesh>
                    <primitive object={box} attach="geometry" />
                    <meshStandardMaterial 
                         attach="material" 
                         color={wallColor}
                         map={wallTexture}
                         opacity={objInstance.wallTexture[wallNo] === 'glass'? 0.6 : 1}
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