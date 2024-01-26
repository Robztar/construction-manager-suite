import React, { useEffect, useRef } from 'react';
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls';
import { useThree, extend } from '@react-three/fiber';

extend({ PointerLockControlsImpl });

export const FPVControls = (props) => {
  const { camera, gl } = useThree();
  const controls = useRef();
  let c = 0;
  
  useEffect(() => {
    document.addEventListener('keyup', (e) => {
      if (e.code === 'Space'){
        if (c <= 0){
          controls.current?.lock();
          c++
          console.log('Space')
        }
        else if(c > 0){
          controls.current?.unlock();
          c--
          console.log('Space Again')
        }
      }
    });
  }, []);

  return (
    <pointerLockControlsImpl
      ref={controls}
      args={[camera, gl.domElement]}
      {...props}
    />
  );
};