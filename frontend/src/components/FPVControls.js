import React, { useEffect, useRef } from 'react';
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls';
import { useThree, extend } from '@react-three/fiber';
// import { useRef } from 'react';

extend({ PointerLockControlsImpl });

export const FPVControls = (props) => {
  const { camera, gl } = useThree();
  const controls = useRef();
  let c = 0;
  
  useEffect(() => {
    document.addEventListener('keyup', (e) => {
      if (e.code === 'Space'){
        if (c <= 0){
          controls.current.lock();
          c++
          console.log('Space')
        }
        else if(c > 0){
          controls.current.unlock();
          c--
          console.log('Space Again')
        }
      }
      
    });
  }, []);

  // useEffect(() => {
  //   // Consider Click alternative, such as CTRL or arrowKeys or spacebar
    
  //   document.addEventListener('click', () => {
  //     if (c <= 0){
  //       controls.current.lock();
  //       c++
  //     }
  //     else if(c > 0){
  //       controls.current.unlock();
  //       c--
  //     }
  //   });
  // }, []);

  return (
    <pointerLockControlsImpl
      ref={controls}
      args={[camera, gl.domElement]}
      {...props}
    />
  );
};

// For now let's move on to finishing the video this is based on and removing unnecessary minecraft parts
// https://threejs.org/docs/#examples/en/controls/PointerLockControls