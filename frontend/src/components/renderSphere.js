import React from 'react';
import {Sphere, MeshDistortMaterial} from "@react-three/drei";
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import texture from "../img/texture-acrylic.jpg";


const RSphere = ()=>{
     const colorMap = useLoader(TextureLoader, texture);

     return (
          <Sphere visible args={[1,100,200]} scale={1.5}>
               {/* <MeshDistortMaterial color="#8352FD" attach="material" distort={0.3} speed={2} roughness={1} /> */}
               <meshStandardMaterial map={colorMap} />
          </Sphere>
     );
}
export default RSphere;