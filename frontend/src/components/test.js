// This component will be the testing ground for things to be implemented, starting with 3D displaying.
import React, {Suspense, useEffect, useRef} from 'react';
// suspence fallback
import Render3d from './render3d';
import RenderPlane from './renderPlane';
import Movement from './movement';
// import RenderSphere from './renderSphere';

import { Canvas, useFrame } from '@react-three/fiber';
// npm install three @react-three/fiber (react-based three.js (i guess))

import * as THREE from  'three';
// import * as THREE from 'https://cdn.skypack.dev/three';
// cdn for latest version of three.js
// currently that's - https://cdn.skypack.dev/-/three@v0.136.0-4Px7Kx1INqCFBN0tXUQc/dist=es2019,mode=imports/optimized/three.js

import { OrbitControls } from "@react-three/drei";
// npm install @react-three/drei (allows rotating the geometry)

import {Physics} from "@react-three/cannon";
// npm install @react-three/cannon (introduces physics)
const Wrapper = "styled.div";

const sizes = {
     width: window.innerWidth,
     height: window.innerHeight
}
const cursor = {
     x:0,
     y:0
}

const mesh={
     position:null
}

const Cart = () =>{
     const lcart = useRef()
     mesh.position = lcart;
     return(
          <mesh ref={lcart}>
               <meshStandardMaterial color="hotpink" />
               <boxGeometry args={[1,1,1]} />
          </mesh>
     )
};

const Camera = () => {
     const camera = useRef()
     window.addEventListener("mousemove", (event)=>{
          cursor.x = event.clientX / sizes.width - 0.5
          cursor.y = event.clientY / sizes.height - 0.5
     });
     useFrame(()=>{
          if(camera.current && mesh.position.current){
               camera.current.position.x = Math.sin(cursor.x*Math.PI*2)*2;
               camera.current.position.y = cursor.y*3;
               camera.current.position.z = Math.cos(cursor.x * Math.PI*2)*2;

               camera.current.lookAt(mesh.position.current.position);
          }
     });
     return(
          <perspectiveCamera 
               ref={camera} 
               fov={75} 
               aspect={sizes.width/sizes.height} 
               near={0.1}
               far={100}
          >
               <Cart />
          </perspectiveCamera>
     );
};

const Test = () => {
     

     return (
          <Wrapper className="">
               <Canvas className='canvas' >
                    {/* <Camera /> */}
                    <OrbitControls 
                         enableDamping={true} 
                         minDistance={5}
                         maxDistance={15}
                         maxPolarAngle={Math.PI/2 - 0.05}
                    />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[-2,5,2]} intensity={1} />
                    <Physics gravity={[0, 0, 0]}>
                              <Suspense fallback={null}>
                                   {/* <Movement position={[-20, 3, 10]} /> */}
                                   <Render3d />
                                   <RenderPlane />
                              </Suspense>
                    </Physics>
                    

                    {/* <OrbitControls enableZoom={false} />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[-2,5,2]} intensity={1} />
                    <Suspense fallback={null}>
                         <RenderSphere />
                    </Suspense> */}
               </Canvas>
          </Wrapper>
     );
}
export default Test;