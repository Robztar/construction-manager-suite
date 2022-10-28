import React, { useMemo } from 'react';
import { usePlane } from '@react-three/cannon';
import {
  TextureLoader,
  RepeatWrapping,
  NearestFilter,
  LinearMipMapLinearFilter,
} from 'three';

import grass from '../images/grass.jpg';
// import { useStore } from '../hooks/objStore';

export const Ground = (props) => {
  const [ref] = usePlane(() => ({ 
    rotation: [-Math.PI / 2, 0, 0], ...props 
  }));
  
  const texture = useMemo(() => {
    const t = new TextureLoader().load(grass)
    t.wrapS = RepeatWrapping
    t.wrapT = RepeatWrapping
    t.repeat.set(100, 100)
    return t
  }, [])

  // const [setActive] = useStore((state) => [
  //   state.setActive
  // ]);

  texture.magFilter = NearestFilter;
  texture.minFilter = LinearMipMapLinearFilter;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(100, 100);

  return (
    <mesh
      ref={ref}
      receiveShadow
      // onClick={(e) => {
      //   e.stopPropagation();
      // }}
    >
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial map={texture} attach="material" />
    </mesh>
  );
};
