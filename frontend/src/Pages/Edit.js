import React, {useEffect, useRef, useState} from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Sky, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import * as THREE from 'three';

import { Ground } from '../components/Ground';
import { Obj } from '../components/Obj';
import { Model } from '../components/Model';
import { FPVControls } from '../components/FPVControls';
import { Player } from '../components/Player';

import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { useStore } from '../hooks/objStore'; 

import Navbar from '../components/Navbar';
import SpaceReminder from '../components/SpaceReminder';
import pointer from '../images/cursor.png';

//---------- UPDATED - Works ------------//
// - Perspective (with movement) - check
// - Ortho (with movement) - check

// ---------------- Camera Controls ----------------
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

export default function Edit() {
     const [isOrtho, setCam] = useState(true);
     const toggleCam = () => {
          setCam((active) => !active);
          setOrtho(!isOrtho);
     }
     var [shapeCount, setShapeCount] = useState(0);

     const [objects, addObj, setOrtho, saveScene] = useStore((state) => [
          state.objects,
          state.addObj,
          state.setOrtho,
          state.saveWorld
     ]);
     const addNew = (e) =>{
          const shape = e.target.getAttribute("data-shape");
          const objType = e.target.getAttribute("data-type");
          if(!isOrtho){
               toggleCam();
          }
          toggleClass();
          addObj(null, shape, objType);
          setShapeCount(objects.length);
     }

     const [isActive, setActive] = useState(false);
     const toggleClass = () => setActive(!isActive);

     return (
          <>
               <Canvas shadowMap sRGB className='canvas'>
                    <Sky sunPosition={[100, 20, 100]} />
                    <ambientLight intensity={0.25} />
                    <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
                    {isOrtho? <gridHelper args={[100, 100, `white`, `gray`]} /> : null}
                    <Physics gravity={[0, -30, 0]}>
                         {isOrtho? <MakeOrtho /> : <MakePersp />}
                         {/* <Room /> */}
                         <Ground position={[0, -0.5, 0]} />
                    </Physics>
                    {objects.map(({key, shape, objType}) =>
                         objType === 'model'? (
                              <Model 
                                   isOrtho={true} 
                                   key = {key}
                                   unique = {key}
                                   setShape={shape}
                                   nkey={shapeCount} 
                              />
                         ):(
                              <Obj 
                                   isOrtho={true} 
                                   key = {key}
                                   unique = {key}
                                   setShape={shape}
                                   nkey={shapeCount} 
                              />
                         )
                    )}
               </Canvas>
               <Navbar/>
               <div className={`top drop-menu ${isActive ? 'active' : ''}`} > 
                    {/* Hamburger */}
                    <div className={`exham extgl ${isActive ? 'active' : ''}`} onClick={toggleClass}>
                         <div className="tripbar"></div>
                    </div>
                    {/* Objects Menu */}
                    <div className={`object-menu ${isActive ? 'active' : ''}`}>
                         <div className="object-li" id='box'>
                              <p className="object-n" onClick={addNew} data-type={'custom'} data-shape={"box"}>Box</p>
                              <p className="object-t box" onClick={addNew} data-type={'custom'} data-shape={"box"}>img</p>
                         </div>
                         <div className="object-li">
                              <p className="object-n" onClick={addNew} data-type={'custom'} data-shape={'sphere'}>Sphere</p>
                              <p className="object-t sphere" onClick={addNew} data-type={'custom'} data-shape={'sphere'}>img2</p>
                         </div>
                         <div className="object-li">
                              <p className="object-n" onClick={addNew} data-type={'custom'} data-shape={'cylinder'}>Cylinder</p>
                              <p className="object-t cylinder" onClick={addNew} data-type={'custom'} data-shape={'cylinder'}>img3</p>
                         </div>
                         <div className="object-li">
                              <p className="object-n" onClick={addNew} data-type={'model'} data-shape={'shiba'}>Shiba</p>
                              <p className="object-t shiba" onClick={addNew} data-type={'model'} data-shape={'shiba'}>img4</p>
                         </div>
                    </div>
               </div>
               {isOrtho? null : <SpaceReminder />}
               <div className="switch-cont">
                    <div className="switch">
                         {isOrtho? 
                              <div className="selector" id="three-d" onClick={toggleCam}>3D</div> 
                              : 
                              <div className="selector" id="two-d" onClick={toggleCam}>2D</div>
                         }
                    </div>
               </div>
               {isOrtho ? null: 
                    <div className='pointer'>
                         <img src={pointer} alt='pointer' />
                    </div>
               }
               
          </>
     );
}