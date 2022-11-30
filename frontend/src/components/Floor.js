import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';

import { useStore } from '../hooks/objStore';
import * as textures from '../textures';

export const Floor = ({ ...props }) =>{
     const unique = props.unique;
     const objInstance = props.instance;
     const conversion = props.conversion;
     const scale = props.scale;

     // Floor height = 10.16cm = 0.102m = 4in (dimTemp = 0.034)
     let dimensions = [
          objInstance.dimTemp[0]*conversion,
          // objInstance.dimTemp[1]*conversion[1],
          0.034*conversion,
          objInstance.dimTemp[2]*conversion
     ];
     

     const [ setActive ] = useStore((state) => [state.setActive]);

     let box;
     if(scale === 'metric'){
          box = new THREE.BoxBufferGeometry(dimensions[0],dimensions[1],dimensions[2]);
     }else if (scale === 'imperial'){
          box = new THREE.BoxBufferGeometry(dimensions[0],dimensions[1],dimensions[2]);
     }

     return (
          <>
               <mesh 
                    onClick={() => {
                         setActive(unique);
                    }}
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