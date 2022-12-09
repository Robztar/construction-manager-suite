import { Canvas, useFrame } from '@react-three/fiber';
import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrthographicCamera, PerspectiveCamera, Sky } from '@react-three/drei';
import { Physics} from '@react-three/cannon';

import { FPVControls } from '../components/environment/FPVControls';
import { Player } from '../components/environment/Player';
import { Ground } from '../components/environment/Ground';
// import { Box } from '../components/Box';
// import { Shape } from '../components/Shape';
import { Obj } from '../components/objects/Obj';
import { Model } from '../components/objects/Model';
import { Room } from '../components/rooms/Room';
import { Attribute } from '../components/html/Attribute';
import { FurnishMenu } from '../components/html/FurnishMenu';
import { WallMenu } from '../components/html/WallMenu';

import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { useStore } from '../hooks/objStore'; 
// import { DragControls } from '../js/DragControls';

import Navbar from '../components/html/Navbar';

// -------Search 'Measurement Scale'---------
  // To see the progress made on scaling the canvas 
  // (also see Obj.js and objStore.js)


let pos = [0,1,0];

const MakeOrtho = ({scale}) => {
// const MakeOrtho = ({ lookX, lookY, lookZ }) => {
  // const [objects, addObj, setOrtho, saveScene] = useStore((state) => [
  //   state.objects,
  //   state.addObj,
  //   state.setOrtho,
  //   state.saveWorld
  // ]);
  const vec = new THREE.Vector3();

  // Measurement Scale
  let zoom;
  if(scale === 'metric'){
    zoom = 10;
  }else{
    zoom = 20;
  }

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
      <OrthographicCamera makeDefault zoom={zoom} />
    </>
  );
}

const MakePersp = ({scale}) =>{
  // Measurement Scale
  let userPos
  if(scale === 'metric'){
    userPos = [0,6,10];
  }else{
    userPos = [0,5.42,10];
  }
  
  return(
    <>
      <Player position={userPos} />
      <FPVControls />
      <PerspectiveCamera makeDefault />
    </>
  )
}

export default function NewEdit() {
  const [objects, scale, 
    addObj, 
    switchOrtho, 
    switchScale, 
    switchConv, 
    saveWorld, 
    resetWorld,
    saveFixtures, 
    resetFixtures,
  ] = 
    useStore((state) => [state.objects, state.scale,
    state.addObj,
    state.switchOrtho,
    state.switchScale,
    state.switchConv,
    state.saveWorld,
    state.resetWorld,
    state.saveFixtures,
    state.resetFixtures,
  ]);
  
  let gridLen;
  let gridBoxCount;
  // const [gridLen, setGridLen] = useState(256);
  // const [gridBoxCount, setGridBoxCount] = useState(64);

  const [isOrtho, setCam] = useState(true);
  const toggleCam = () => {
    setCam((active) => !active);
    switchOrtho(!isOrtho);
  }

  const [isActive, setActive] = useState(false);
  const toggleClass = () => setActive(!isActive);

  // add new object
  // const [isShape, setShape] = useState([]);

  const [shapeCount, setShapeCount] = useState(0);
  // useEffect(() => {

  // },[isOrtho]);

  // Measurement Scale
  let objTest = objects[0];
  let scaleState = 'metric';
  if(objTest){
    scaleState = scale;
  }
  const [envScale, setEnvScale] = useState(scaleState);
  const makeMetric = () => {
    setEnvScale('metric');
    switchScale('metric');
    switchConv(12);
    console.log(scale);
  }
  const makeImperial = () => {
    setEnvScale('imperial');
    switchScale('imperial');
    switchConv(10);
    console.log(scale);
  }
  if(envScale === 'metric'){
    gridLen = 256;
    gridBoxCount = 64;
  }
  else if(envScale === 'imperial'){
    gridLen = 208;
    gridBoxCount = 104;
  }

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

  const saveScene = () =>{
    saveFixtures();
    saveWorld();
  }
  const resetScene = () =>{
    resetFixtures();
    resetWorld();
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
          {/* Measurement Scale */}
          {isOrtho? <MakeOrtho scale={envScale} /> : <MakePersp scale={envScale} />}
          <Ground position={[0, -0.5, 0]} scale={envScale} />
          {/* <Room /> */}
          {/* {isShape} */}
          {objects.map(({key, shape, objType}) =>{
              if(objType === 'model'){
                return(
                  <Model 
                    key = {key}
                    unique = {key}
                    setShape={shape}
                  />
                )
              }else if(objType === 'custom'){
                return(
                  <Obj 
                    key = {key}
                    unique = {key}
                    setShape={shape}
                  />
                )
              }else if(objType === 'room'){
                return(
                  <Room 
                    key = {key}
                    unique = {key}
                    setShape={shape}
                  />
                )
              }
              return null;
              // objType === 'model'? (
              //   <Model 
              //     isOrtho={true} 
              //     key = {key}
              //     unique = {key}
              //     setShape={shape}
              //     nkey={shapeCount} 
              //   />
              // ):(
              //   <Obj 
              //     isOrtho={true} 
              //     key = {key}
              //     unique = {key}
              //     setShape={shape}
              //     nkey={shapeCount} 
              //   />
              // )
            })}
        </Physics>

      </Canvas>
      <Navbar />

      {/* Objects Drop-Menu */}
      <div className={`top drop-menu ${isActive ? 'active' : ''}`} > 
        {/* Hamburger */}
        <div className={`exham extgl ${isActive ? 'active' : ''}`} onClick={toggleClass}>
            <div className="tripbar">
            </div>
        </div>
        {/* Objects List */}
        <div className={`object-menu ${isActive ? 'active' : ''}`}>
            <div className="object-li" id='box'>
                  <p className="object-n" onClick={addNew} data-type={'room'} data-shape={"rect"}>Room</p>
                  <p className="object-t box" onClick={addNew} data-type={'room'} data-shape={"rect"}></p>
            </div>
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

      <Attribute />
      <FurnishMenu />
      <WallMenu />

      {/* New Ideo - Settings Icon 
        Copy style of functionaility of Drop menu
        Position like state-btn-cont
        Contain: -State Buttons -Scale Switch */}
        
      {/* Save/Reset World */}
      <div className='top state-btn-cont'>
        <div className='state-save state-btn' onClick={saveScene}>Save</div>
        <div className='state-reset state-btn' onClick={resetScene}>Reset</div>
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

      {/* Measurement Scale */}
      <div className='scale-cont'>
        {envScale === 'metric'? 
            <div className="sel-scale" onClick={makeImperial}>Imperial</div> 
            : 
            <div className="sel-scale" onClick={makeMetric}>Metric</div>
        }
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