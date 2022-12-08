import React, { useMemo } from 'react';
import { usePlane } from '@react-three/cannon';
import {
  TextureLoader,
  RepeatWrapping,
  NearestFilter,
  LinearMipMapLinearFilter,
} from 'three';

import grass from '../../images/grass.jpg';
// import { useStore } from '../../hooks/objStore';

export const Ground = (props) => {
  const [ref] = usePlane(() => ({ 
    rotation: [-Math.PI / 2, 0, 0], 
    position: props.position
    // ...props 
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
  
  const texture = useMemo(() => {
    const t = new TextureLoader().load(grass)
    t.wrapS = RepeatWrapping
    t.wrapT = RepeatWrapping
    t.repeat.set(width, length)
    return t
  }, [])

  
  

  

  texture.magFilter = NearestFilter;
  texture.minFilter = LinearMipMapLinearFilter;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(width, length);

  return (
    <mesh
      ref={ref}
      receiveShadow
      // onClick={(e) => {
      //   e.stopPropagation();
      // }}
    >
      <planeBufferGeometry attach="geometry" args={[width, length]} />
      <meshStandardMaterial map={texture} attach="material" />
    </mesh>
  );
};


  // const [objects] = useStore((state) => [
  //   state.objects
  // ]);
  // let objTest = objects[0];

  
  // if(objTest){
  //   if(objects[0].scale === 'metric'){
  //     length = 256;
  //     width = 256;
  //   }
  //   else if(objects[0].scale === 'imperial'){
  //     length = 208;
  //     width = 208;
  //   }
  // }
  // else{
  //   length = 256;
  //   width = 256;
  // }