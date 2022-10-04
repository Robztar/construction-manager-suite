import React, {useEffect, useRef, useState} from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { meshBounds, Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { OrthographicCamera } from "@react-three/drei";
// import { OrbitControls } from '@react-three/drei';
// import { FirstPersonControls } from '@react-three/drei';
// import * as THREE from 'three';

import { Ground } from '../components/Ground';
import Room from '../components/Room';
import { Player } from '../components/Player';
import {TwoDControls} from '../components/TwoDControls';

import Navbar from '../components/Navbar';
import { FPVControls } from '../components/FPVControls';

import pointer from '../images/cursor.png';


const IsFPVControls = () =>{
     return (
          <>
               <Player position={[0, 3, 10]} />
               <FPVControls />
          </>
          // <div id = "fpv-id">FPV Works</div>
     )
}
const IsOrthographicCamera = () =>{

     // const vec = new THREE.Vector3();

     // useFrame((state) => {
          // const step = 0.1;
          // const [posX,posZ] = [0,0,0];
          // const posY = 10;

          // state.camera.position.lerp(vec.set(posX,posY,posZ), step);
          // // state.camera.lookAt(origin, origin, origin);
          // state.camera.updateProjectionMatrix();
     // });

     return (
          <>
               <TwoDControls position={[0, 10, 0]} />
               <OrthographicCamera 
                    left = {0}
                    right = {window.innerWidth}
                    top = {0}
                    bottom = {window.innerHeight}
                    zoom={0.2}
                    up={(0,-1,0)}
               />
               {/* FPV replica without camera lock feature */}
          </>
          
          // <div id = "ortho-id">Ortho Works</div>
     )
}

function Edit() {
     let count = 0;
     let gravY = 0;

     const [cameraType, setCameraType] = useState([]);
     let dimension = 'ortho';

     useEffect(() => {
          console.log(dimension);
          setCameraType(cameraType.concat(<IsOrthographicCamera key={cameraType.length} />));
          console.log(cameraType);
     },[count>0]);

     
     // Needs an on-start function
     // setcameraType(cameraType.concat(<IsFPVControls key={cameraType.length} />));

     function changeTo2D(){
          setCameraType(cameraType.pop());
          dimension = 'ortho';
          gravY = 0;
          // count++;
          console.log(dimension);
          setCameraType(cameraType.concat(<IsOrthographicCamera key={cameraType.length} />));
          console.log(cameraType);
     }
     const changeTo3D = () =>{
          setCameraType(cameraType.pop());
          dimension = 'fpv';
          gravY = -30;
          // count++;
          console.log(dimension);
          setCameraType(cameraType.concat(<IsFPVControls key={cameraType.length} />));
          console.log(cameraType);
     }
     return (
          <>
               <Canvas shadowMap sRGB className='canvas'>
                    <Sky sunPosition={[100, 20, 100]} />
                    <ambientLight intensity={0.25} />
                    <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
                    {/* <Hud position={[0, 0, -2]} /> */}
                    <Physics gravity={[0, gravY, 0]}>
                         <Ground position={[0, 0.5, 0]} />
                         {/* <Player position={[0, 3, 10]} /> */}
                         {/* <FPVControls /> */}
                         {cameraType}
                         <Room />
                    </Physics>
               </Canvas>
               {/* {cameraType} */}
               
               {/* <div className='floating'>
                    * <span className=''>Camera Vectors</span>
                    <span className='pos'></span>
                    <span className='look'></span> *
                    
               </div> */}
               <Navbar/>
               {/* <ModeSwitch/> */}
               <div className="switch-cont">
                    <div className="switch">
                         <div className="selector" id="two-d" onClick={changeTo2D}>2D</div>
                         {/* <hr/> */}
                         <div className="selector" id="three-d" onClick={changeTo3D}>3D</div>
                    </div>
               </div>
               <div className='pointer'>
               <img src={pointer} alt='pointer' />
               </div>
               
               
          </>
     );
}

export default Edit;
