import React from 'react';

import Floor from './Floor';
import Wall from './Wall';

// import React, { useState, useRef, useEffect } from 'react';
// import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three';

import { useStore } from '../hooks/objStore';

export const Room = ({ setShape, unique}) =>{
     const [ objects, iniDim] = useStore((state) => [ state.objects, state.iniDim]);
     
     let objInstance = objects.find(o => o.key === unique);

     let conversion = iniDim;
     let dimensions;

     if (objInstance) {
          dimensions = [
               objInstance.dimTemp[0]*conversion[0],
               objInstance.dimTemp[1]*conversion[1],
               objInstance.dimTemp[2]*conversion[2]
          ];
          // console.log('Still here');
          return (
               <>
                    <Floor
                         instance={objInstance}
                         unique={unique}
                         dimensions={dimensions}
                    />
                    <Wall
                         instance={objInstance}
                         unique={unique}
                         dimensions={dimensions}
                         wallNo={0}
                    />
                    <Wall
                         instance={objInstance}
                         unique={unique}
                         dimensions={dimensions}
                         wallNo={1}
                    />
                    <Wall
                         instance={objInstance}
                         unique={unique}
                         dimensions={dimensions}
                         wallNo={2}
                    />
                    <Wall
                         instance={objInstance}
                         unique={unique}
                         dimensions={dimensions}
                         wallNo={3}
                    />
               </>
          );
     } else{
          // console.log('Left the chat');
          return null;
     }
}