import React, {useEffect, useRef, useState} from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import * as THREE from 'three';

import { Ground } from '../components/Ground';
import Room from '../components/Room';
import { Player } from '../components/Player';
import { useKeyboardControls } from '../hooks/useKeyboardControls';

import Navbar from '../components/Navbar';
import { FPVControls } from '../components/FPVControls';

import pointer from '../images/cursor.png';

//---------- UPDATED - Works ------------//
// - Perspective (with movement) - check
// - Ortho (with movement) - check

let pos = [0,1,0];

const MakeOrtho = () => {
     const vec = new THREE.Vector3();

     const { moveForward, moveBackward, moveLeft, moveRight} = useKeyboardControls();

     if (moveLeft? pos[0]-=1:null);
     if (moveRight? pos[0]+=1:null);
     if (moveBackward? pos[2]+=1:null);
     if (moveForward? pos[2]-=1:null);

     useFrame((state) => {
          const step = 1;
          const x = pos[0];
          const y = 5;
          const z = pos[2];
          state.camera.position.lerp(vec.set(x, y, z), step);
          state.camera.lookAt(x,0,z);
          state.camera.updateProjectionMatrix();
     });
     return(
          <>
               <OrthographicCamera makeDefault zoom={40} />
          </>
     );
}

const MakePersp = () =>{
     return(
          <>
               <Player position={[0, 3, 10]} />
               <FPVControls />
               <PerspectiveCamera makeDefault />
          </>
     )
}

const Box = ({pos}) =>{
     return (
          <mesh position={[pos[0],pos[1],pos[2]]}>
               <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
               <meshNormalMaterial attach="material" />
          </mesh>
     );
}

// const Plane = () => {
//      return (
//           <mesh position={[0,-0.1,0]} scale={100} rotation={[-Math.PI / 2, 0, 0]}>
//                <planeBufferGeometry attach="geometry" />
//                <meshStandardMaterial color="white" attach="material" side={THREE.DoubleSide} />
//           </mesh>
//      );
// };

export default function Edit() {
     const [isOrtho, setCam] = useState(true);
     const toggleCam = () => setCam((active) => !active);

     return (
          <>
               <Canvas shadowMap sRGB className='canvas'>
                    <Sky sunPosition={[100, 20, 100]} />
                    <ambientLight intensity={0.25} />
                    <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
                    <gridHelper args={[100, 100, `white`, `gray`]} />
                    <Physics gravity={[0, -30, 0]}>
                         {isOrtho? <MakeOrtho /> : <MakePersp />}
                         <Room />
                         <Ground position={[0, -0.5, 0]} />
                    </Physics>
                    <Box pos={[0,1,0]} />
               </Canvas>
               <Navbar/>
               <div className="switch-cont">
                    <div className="switch">
                         {isOrtho? 
                              <div className="selector" id="three-d" onClick={toggleCam}>3D</div> 
                              : 
                              <div className="selector" id="two-d" onClick={toggleCam}>2D</div>
                         }
                    </div>
               </div>
               <div className='pointer'>
               <img src={pointer} alt='pointer' />
               </div>
          </>
     );
}