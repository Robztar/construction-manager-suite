import React from 'react';

const Plane = ()=>{

     return (
          <mesh position={[0,0,0]} rotation={[-Math.PI/2,0,0]}>
               <planeBufferGeometry attach="geometry" args={[100,100]} />
               <meshLambertMaterial attach='material' color='lightblue' />
          </mesh>
     );
}
export default Plane;