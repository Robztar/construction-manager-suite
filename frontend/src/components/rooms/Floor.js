import React from 'react';
// import React, { useState, useRef, useEffect } from 'react';

import * as THREE from 'three';

// import { useStore } from '../../hooks/objStore';
import * as textures from '../../textures';

export const Floor = ({ ...props }) =>{
     // const unique = props.unique;
     const objInstance = props.instance;
     const conversion = props.conversion;
     const scale = props.scale;
     let height = props.height * conversion;
     

     // Floor thickness = 10.16cm = 0.102m = 4in (dimTemp = 0.034)
     const thickness = 0.034 * conversion;
     let dimensions = [
          objInstance.dimTemp[0]*conversion,
          thickness,
          objInstance.dimTemp[2]*conversion
     ];
     height -= thickness;

     let box;
     if(scale === 'metric'){
          box = new THREE.BoxBufferGeometry(dimensions[0],dimensions[1],dimensions[2]);
     }else if (scale === 'imperial'){
          box = new THREE.BoxBufferGeometry(dimensions[0],dimensions[1],dimensions[2]);
     }

     return (
          <>
               <mesh 
                    position={[0,height,0]}
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