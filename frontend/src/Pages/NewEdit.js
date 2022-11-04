import { Canvas, useFrame } from '@react-three/fiber';
import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrthographicCamera, PerspectiveCamera, Sky } from '@react-three/drei';
import { Physics} from '@react-three/cannon';

import { FPVControls } from '../components/FPVControls';
import { Player } from '../components/Player';
import { Ground } from '../components/Ground';
// import { Box } from '../components/Box';
// import { Shape } from '../components/Shape';
import { Obj } from '../components/Obj';
import { Model } from '../components/Model';
// import Room from '../components/Room';

import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { useStore } from '../hooks/objStore'; 
// import { DragControls } from '../js/DragControls';

import Navbar from '../components/Navbar';

// -------Search 'Metric Scale'---------
  // To see the (commented) progress made on making 
  // the scene metric-scaled (also see Obj.js)


let pos = [0,1,0];

const MakeOrtho = ({isShape}) => {
// const MakeOrtho = ({ lookX, lookY, lookZ }) => {
  // const [objects, addObj, setOrtho, saveScene] = useStore((state) => [
  //   state.objects,
  //   state.addObj,
  //   state.setOrtho,
  //   state.saveWorld
  // ]);
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
    const y = 100;
    const z = pos[2];
    state.camera.position.lerp(vec.set(x, y, z), step);
    state.camera.lookAt(x,0,z);
    // state.camera.rotateX(Math.PI * 0.5);
    state.camera.updateProjectionMatrix();
  });
  return(
    <>
      <OrthographicCamera makeDefault zoom={40} />
      {/* Metric Scale */}
      {/* <OrthographicCamera makeDefault zoom={10} /> */}
      {isShape}
    </>
  );
}

const MakePersp = ({isShape}) =>{
  let userPos = [0,1,10];
  // Metric Scale
  // let userPos = [0,6,10];
  return(
    <>
      <Player position={userPos} />
      <FPVControls />
      <PerspectiveCamera makeDefault />
      {isShape}
    </>
  )
}

export default function NewEdit() {
  let gridLen = 100;
  let gridBoxCount = 100;
  // Metric Scale
  // let gridLen = 256;
  // let gridBoxCount = 64;

  const [isOrtho, setCam] = useState(true);
  const toggleCam = () => {
    setCam((active) => !active);
    setOrtho(!isOrtho);
  }
  // function getCam() {return isOrtho};

  const [isActive, setActive] = useState(false);
  const toggleClass = () => setActive(!isActive);

  // add new object
  // const [isShape, setShape] = useState([]);

  const [shapeCount, setShapeCount] = useState(0);
  useEffect(() => {

  },[isOrtho]);

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

  return (
    <div className='canvas-cont'>
      <Canvas sRGB>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.25} />
        <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
        <gridHelper args={[gridLen, gridBoxCount, `red`, `gray`]} />
        {/* <spotLight position={[100, 150, 100]} angle={0.3}/>
        <ambientLight intensity={0.25} /> */}
        {/* <Physics gravity={[0, -30, 0]}> */}
        <Physics gravity={[0, 0, 0]}>
          {isOrtho? <MakeOrtho /> : <MakePersp />}
          {/* {isOrtho? <MakeOrtho isShape={isShape} /> : <MakePersp isShape={isShape} />} */}
          <Ground position={[0, -0.5, 0]} />
          {/* <Room /> */}
          {/* {isShape} */}
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
        </Physics>

      </Canvas>
      <Navbar />

      <div className={`top drop-menu ${isActive ? 'active' : ''}`} > 
        {/* Hamburger */}
        <div className={`exham extgl ${isActive ? 'active' : ''}`} onClick={toggleClass}>
            <div className="tripbar">
            </div>
        </div>
        {/* Objects Menu */}
        <div className={`object-menu ${isActive ? 'active' : ''}`}>
            <div className="object-li" id='box'>
                  <p className="object-n" onClick={addNew} data-type={'custom'} data-shape={"box"}>Box</p>
                  <p className="object-t box" onClick={addNew} data-type={'custom'} data-shape={"box"}></p>
            </div>
            <div className="object-li">
                  <p className="object-n" onClick={addNew} data-type={'custom'} data-shape={'sphere'}>Sphere</p>
                  <p className="object-t sphere" onClick={addNew} data-type={'custom'} data-shape={'sphere'}></p>
            </div>
            <div className="object-li">
                  <p className="object-n" onClick={addNew} data-type={'custom'} data-shape={'cylinder'}>Cylinder</p>
                  <p className="object-t cylinder" onClick={addNew} data-type={'custom'} data-shape={'cylinder'}></p>
            </div>
            <div className="object-li">
                  <p className="object-n" onClick={addNew} data-type={'model'} data-shape={'shiba'}>Shiba</p>
                  <p className="object-t shiba" onClick={addNew} data-type={'model'} data-shape={'shiba'}></p>
            </div>
        </div>
      </div>

      <div className="switch-cont">
        <div className="switch">
          {isOrtho? 
            <div className="selector" id="three-d" onClick={toggleCam}>3D</div> 
            : 
            <div className="selector" id="two-d" onClick={toggleCam}>2D</div>
          }
        </div>
      </div>


      {/* <div className='sr-cont'>
        <div>
          <p>Width = </p>
          <p>{window.innerWidth}</p>
        </div>
        <div>
          <p>Height = </p>
          <p>{window.innerHeight}</p>
        </div>
      </div> */}

    </div>
  );
}