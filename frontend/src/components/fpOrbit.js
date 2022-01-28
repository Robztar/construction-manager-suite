import React from 'react';
import * as THREE from  'three';
import { FirstPersonControls, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from '@react-three/fiber';
import { Vector3 } from "three";

// const CreateWorld = () => {
//           return (
//                <mesh position={[0,1,0]}>
//                     <boxBufferGeometry attach="geometry" args={[2,2,2]} />
//                     <meshNormalMaterial attach='material' />
//                </mesh>
//      );
// };


const FpOrbit = () =>{
//      return(
//           <Canvas className='canvas'>
//                <OrbitControls 
//                     enableDamping={true} 
//                     minDistance={5}
//                     maxDistance={15}
//                     maxPolarAngle={Math.PI/2 - 0.05}
//                />
//                {/* <OrbitControls
//                     enableZoom={false}
//                     enablePan={false}
//                     minPolarAngle={Math.PI / 2}
//                     maxPolarAngle={Math.PI / 2}
//                /> */}
//                <FirstPersonControls
//                     camera={[-150,20,0]}
//                     autoForward={false}
//                     heightCoef={0.4}
//                     activeLook={false}
//                     mouseDragOn={false}
//                />
//                {/* <PerspectiveCamera 
//                     fov={60}
//                     aspect={window.innerWidth / window.innerHeight}
//                     near={0.1}
//                     far={1000.0}
//                /> */}
//                <ambientLight intensity={0.5} />
//                <directionalLight position={[-2,5,2]} intensity={1} />
//                <CreateWorld />
//           </Canvas>
//      )
// }

// export default FpOrbit;





// const FpOrbit = () =>{
//      let camera, scene, renderer, controls, mesh;

//      const createWorld = () => {
//           mesh = new THREE.Mesh(
//                new THREE.BoxBufferGeometry(2, 2, 2),
//                new THREE.MeshStandardMaterial({ color: 0xff9999 })
//           );
          
//           scene.add(mesh);
          
//           setInterval(() => {
//                mesh.rotateY(0.001);
//           }, 1 / 60);
//      };

//      const init = () => {
//           camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000.0);
//           camera.position.set(-5, 0, 7);

//           scene = new THREE.Scene();
//           scene.background = new THREE.Color(0x333333);

//           scene.add(new THREE.HemisphereLight(0xffffcc, 0x19bbdc, 1));

//           renderer = new THREE.WebGLRenderer({ antialias: true });
//           renderer.setSize(window.innerWidth, window.innerHeight);

//           document.body.appendChild(renderer.domElement);
     
//           controls = new OrbitControls(camera, renderer.domElement);
          
//           const updateCameraOrbit = () => {
//                const forward = new Vector3();
//                camera.getWorldDirection(forward);

//                controls.target.copy(camera.position).add(forward);
//           };
          
//           controls.addEventListener('end', () => {
//                updateCameraOrbit();
//           });
          
//           updateCameraOrbit();
          
//           createWorld();
//      }

//      const animate = () => {
//      requestAnimationFrame(animate);

//      controls.update();

//      renderer.render(scene, camera); 
//      }

//      init();
//      animate();
}

export default FpOrbit;