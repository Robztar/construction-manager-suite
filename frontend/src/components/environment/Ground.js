import React from 'react';
import { usePlane } from '@react-three/cannon';

import * as textures from '../../textures';
// import { useStore } from '../../hooks/objStore';

export const Ground = (props) => {
  const [ref] = usePlane(() => ({ 
    rotation: [-Math.PI / 2, 0, 0], 
    position: props.position
  }));

  let length;
  let width;

  // Measurement Scale
  if(props.scale === 'metric'){
    length = 256;
    width = 256;
  }
  else if(props.scale === 'imperial'){
    length = 208;
    width = 208;
  }

  let groundTexture = textures['grass'];
  groundTexture.repeat.set(width, length);

  return (
    <mesh
      ref={ref}
      receiveShadow
      // onClick={(e) => {
      //   e.stopPropagation();
      // }}
    >
      <planeBufferGeometry attach="geometry" args={[width, length]} />
      <meshStandardMaterial map={groundTexture} attach="material" />
    </mesh>
  );
};