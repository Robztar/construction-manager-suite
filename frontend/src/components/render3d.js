import React from 'react';
// import { ScrollControls, Scroll, useScroll } from '@react-three/drei'


// import { useLoader } from '@react-three/fiber';
// import { TextureLoader } from 'three';
// import texture from "../img/texture-acrylic.jpg";
// these offer texture support (textures can come from pexels)

const Box = ()=>{
     // const colorMap = useLoader(TextureLoader, texture);
     // const scroll = useScroll;

     return (
                    <mesh position={[0,1,0]}>
                         <boxBufferGeometry attach="geometry" args={[2,2,2]} />
                         {/* <meshLambertMaterial attach="material" color="blue" /> */}
                         {/* <meshStandardMaterial map={colorMap} /> */}
                         <meshNormalMaterial attach='material' />
                    </mesh>
     );
}
export default Box;