import { Canvas, useFrame} from '@react-three/fiber';
import React, { useState} from 'react';
import * as THREE from 'three';
import { OrthographicCamera, PerspectiveCamera, Sky } from '@react-three/drei';
import { Physics} from '@react-three/cannon';

import { FPVControls } from '../components/FPVControls';
import { Player } from '../components/Player';
import { Ground } from '../components/Ground';
import Room from '../components/Room';
import { useKeyboardControls } from '../hooks/useKeyboardControls';

import Navbar from '../components/Navbar';

// Currently, in ortho mode, the camera moves, 
// but the lookAT remains the same, causing a tilt
//  How to fix... idk
  // Try: looking at the box (https://www.youtube.com/watch?v=I7t-s-kOStA)
                          // (https://medium.com/@zmommaerts/animate-a-camera-in-react-three-fiber-7398326dad5d)
        // Then try a lookAt to the box
  // Try a Raycast (https://www.youtube.com/watch?v=Mpd1MFr8HoE)



// const CameraDolly = ({ lookX, lookY, lookZ }) => {
  // const vec = new THREE.Vector3();

  // useFrame((state) => {
  //   const step = 0.1;
  //   const x = 0;
  //   const y = 5;
  //   const z = 0;
  //   // const x = isZoom ? 0 : 0;
  //   // const y = isZoom ? 10 : 5;
  //   // const z = isZoom ? 10 : 0;

  //   state.camera.position.lerp(vec.set(x, y, z), step);
  //   // state.camera.lookAt(0, 0, 0);
  //   // state.camera.lookAt(lookX,lookY,lookZ);
  //   state.camera.updateProjectionMatrix();
  // });

  // return null;
// }

let pos = [0,1,0];

const MakeOrtho = () => {
// const MakeOrtho = ({ lookX, lookY, lookZ }) => {
  const vec = new THREE.Vector3();

  const { moveForward, moveBackward, moveLeft, moveRight} = useKeyboardControls();

  if (moveLeft? pos[0]-=1:null);
  if (moveRight? pos[0]+=1:null);
  if (moveBackward? pos[2]+=1:null);
  if (moveForward? pos[2]-=1:null);
  
  useFrame((state) => {
    const step = 1;
    // const step = 0.1;
    const x = pos[0];
    const y = 5;
    const z = pos[2];
    state.camera.position.lerp(vec.set(x, y, z), step);
    state.camera.lookAt(x,0,z);
    // state.camera.rotateX(Math.PI * 0.5);
    state.camera.updateProjectionMatrix();
  });
  return(
    <>
      {/* <MoveOrtho /> */}
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
  // const position = pos;
  // const step = 0.1;
  // let position;
  // useFrame((state) =>{
  //   state.position.lerp() = pos;
  // })
  // let direction;
  return (
    <mesh position={[pos[0],pos[1],pos[2]]}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshNormalMaterial attach="material" />
    </mesh>
  );
}

// function animation(){
//   const speed = 0.1;
//   const vec = new THREE.Vector3();
//   let x = Box.mesh.position[0] += speed;
//   let y = Box.mesh.position[1] += speed;
//   let z = Box.mesh.position[2] += speed;
//   Box.mesh.position.lerp(vec.set(x, y, z), speed);
// }

const Plane = () => {
    return (
      <mesh position={[0,-0.1,0]} scale={100} rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach="geometry" />
        <meshStandardMaterial color="white" attach="material" side={THREE.DoubleSide} />
      </mesh>
    );
};

// const MoveOrtho = () => {
//   const vec = new THREE.Vector3();

//   const { moveForward, moveBackward, moveLeft, moveRight} = useKeyboardControls();

  // if (moveLeft? pos[0]+=1:null);
  // if (moveRight? pos[0]-=1:null);
  // if (moveBackward? pos[2]+=1:null);
  // if (moveForward? pos[2]-=1:null);

  // if (moveForward || moveBackward || moveLeft || moveRight? console.log(x+' '+z): null);
  // useFrame((state, delta) => {
  //   const step = 0.1;
  //   const y = 5;
  //   state.camera.position.lerp(vec.set(pos[0], y, pos[2]), step);
    // state.camera.lookAt(pos[0],y,pos[2]);
//     state.camera.updateProjectionMatrix();
//   });
//   return null;
// }

export default function NewEdit() {
  const [isOrtho, setCam] = useState(true);
  const toggleCam = () => setCam((active) => !active);

  return (
    <>
      <Canvas sRGB>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.25} />
        <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
        <gridHelper args={[100, 100, `white`, `gray`]} />
        {/* <spotLight position={[100, 150, 100]} angle={0.3}/>
        <ambientLight intensity={0.25} /> */}
        <Physics gravity={[0, -30, 0]}>
          {isOrtho? <MakeOrtho /> : <MakePersp />}
          {/* {isOrtho? <MakeOrtho lookX={pos[0]} lookY={0} lookZ={pos[2]} /> : <MakePersp />} */}
          <Ground position={[0, -0.5, 0]} />
          <Room />
        </Physics>

        <Box pos={[0,1,0]} />
        {/* <Box pos={pos} /> */}
        {/* <CameraDolly lookX={0} lookY={0} lookZ={0} /> */}
      </Canvas>
      <Navbar/>
      <div className="switch-cont">
        <div className="switch">
          <div className="selector" id="two-d" onClick={toggleCam}>2D</div>
          <div className="selector" id="three-d" onClick={toggleCam}>3D</div>
        </div>
      </div>
    </>
  );
}