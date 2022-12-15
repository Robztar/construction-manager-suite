import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei'
import * as THREE from 'three';

import { MinSelect } from '../rooms/MinSelect';
import { Resizer } from '../rooms/Resizer';

import { useStore } from '../../hooks/objStore';
import * as textures from '../../textures';

// --- GLTF/GLB ---
import Shiba from './Shiba_deadpool';
// Model Downloads - https://polyhaven.com/
               // - https://sketchfab.com/features/gltf
// Model validator - https://github.khronos.org/glTF-Validator/
// Loading models - https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models
               // - https://blog.logrocket.com/configure-3d-models-react-three-fiber/

// More help with gltf/glb models
//   R3F (50mins) - https://www.youtube.com/watch?v=2jwqotdQmdQ
//   Three.js - https://www.youtube.com/watch?v=WBe3xrV4CPM
//   R3F Typescript - https://www.youtube.com/watch?v=tBSbgRRpNzI

export const Model = ({ setShape, unique}) =>{
     // const ref = useRef();

     const [ objects, ortho, projects,
          setPos, 
          setActive, 
          removeObj, 
          // changeColor, 
          // changeTexture, 
          // setTextureMenu, 
          // setTextureOptions, 
          // setMatType
     ] = useStore((state) => [ state.objects, state.ortho, state.projects,
          state.setPos,
          state.setActive,
          state.removeObj,
          // state.changeColor,
          // state.changeTexture,
          // state.setTextureMenu,
          // state.setTextureOptions,
          // state.setMatType,
     ]);
     
     let objInstance = objects.find(o => o.key === unique);

     let prevPos = [0,0,0];
     if (objInstance) prevPos = objInstance.pos;
     
     const Attribute = () =>{
          // let colorAttr = objInstance.color;
          // let textureAttr = objInstance.texture;
          // let colorMenu = objInstance.textureMenu;
          // let textureOptions = objInstance.textureOptions;
          // let matType = objInstance.matType;

          return(
               <div 
                    className='float attr-cont'
                    style={{'display': objInstance.active}}
               >
                    <div className="attr-head">
                         <h3 className='attr-title'>
                              Attribute Menu
                         </h3>
                         <div 
                              className='attr-exit'
                              onClick={()=>setActive('')}
                         >
                              X</div>
                    </div>
                    <div className='attr-menu'>
                         {/* ----Features Coming Soon---- */}
                         {/* <div className={`attr-li ${ textureOptions ||colorMenu ? 'inactive' : ''}`}> */}
                         <div className='attr-li' style={{'grid-template-columns': '1fr 1fr'}}>
                              <div className='attr-n'>Soon...</div>
                              <div 
                                   className='attr-t'
                                   style={{'background':'orange'}}
                                   onClick={(e) =>{
                                        e.stopPropagation();
                                   }}
                              ></div>
                         </div>
                         
                    </div>
                    <div className='attr-footer'>
                         <div 
                              className='attr-n obj-remove'
                              onClick={() => removeObj(unique)}
                         >R</div>
                    </div>
               </div>
          )
     }


     if (objInstance) {
          if(setShape === 'shiba'){
               return (
                    <>
                         <Shiba 
                              instance={objInstance}
                              ortho={ortho}
                              unique={unique}
                              setPos={setPos}
                              setActive ={setActive}
                         />

                         <Html>
                              <Attribute />
                              {/* <MinSelect /> */}
                              {/* <Resizer /> */}
                         </Html>
                    </>
                    
               )}
     }else{
          return null;
     }
}