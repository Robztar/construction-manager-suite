import React, {useState, useEffect, useRef} from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from "three";

// import {Physics} from "@react-three/cannon";
// import Cannon, {useSphere} from "@react-three/cannon";
import {useSphere} from "@react-three/cannon";

const SPEED = 6;

const Movement = (props) => {

     const keys = {
          KeyW: 'forward',
          KeyS: 'backward',
          KeyA: 'left',
          KeyD: 'right'
     }
     const moveFieldByKey = (key) => keys[key]

     const usePersonControls = () => {
          const [movement, setMovement] = useState({
               forward: false,
               backward: false,
               left: false,
               right: false
          })

          useEffect(() => {
               const handleKeyDown = (e) => {
                    setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }))
               }
               const handleKeyUp = (e) => {
                    setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }))
               }

               document.addEventListener('keydown', handleKeyDown)
               document.addEventListener('keyup', handleKeyUp)
               
               return () => {
                    document.removeEventListener('keydown', handleKeyDown)
                    document.removeEventListener('keyup', handleKeyUp)
               }
          }, [])

          return movement;
     }

     const {camera} = useThree();

     const { forward, backward, left, right,} = usePersonControls();

     const [ref, api] = useSphere(() => ({
          mass: 1,
          type: 'Dynamic',
          ...props,
     }));

     const velocity = useRef([0,0,0]);

     useEffect(()=>{
          api.velocity.subscribe((v)=>(velocity.current = v));
     },[api.velocity]);

     useFrame(()=>{
          camera.position.copy(ref.current.position);
          const direction = new Vector3();
          const frontVector = new Vector3(
               0,0,Number(backward) - Number(forward)
          );
          const sideVector = new Vector3(
               Number(left) - Number(right),0,0
          );
          direction
               .subVectors(frontVector, sideVector)
               .normalize()
               .multiplyScalar(SPEED)
               .applyEuler(camera.rotation);
          api.velocity.set(direction.x, velocity.current[1], direction.z);
          ref.current.getWorldPosition(ref.current.position);
     });

     return(
          <mesh ref={ref} />
     )

}
export default Movement;