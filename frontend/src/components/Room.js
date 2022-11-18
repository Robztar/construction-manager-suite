import React from 'react';

import { Floor } from './Floor';
import { Wall } from './Wall';

// import React, { useState, useRef, useEffect } from 'react';
// import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three';

import { useStore } from '../hooks/objStore';

// ---- The Plan ----
// -New Wall attributes in objStore
// -Set Floor height to 10.16cm = 0.102m = 4in (dimTemp = 0.034)
// -Set Wall width to 8in = 20.32cm = 0.203m (dimTemp = 0.068)
// -Map wall pos to floor sides
     // leftWall.posX = floorPosX - (floorWidth / 2)
     // rightWall.posX = floorPosX + (floorWidth / 2)
     // sideWall.posZ = floorPosZ

     // topWall.posZ = floorPosZ + (floorLength / 2)
     // bottomWall.posZ = floorPosZ - (floorLength / 2)
     // endWall.posX = floorPosX

// -Map floor size & pos to wall movement
     // - Left Wall
     // floorWidth = floorWidth - (current.leftWall.posX - prev.leftwall.posX)
     // floor.posX = floor.posX + ((current.leftWall.posX - prev.leftwall.posX) / 2)
     
     // - Right Wall
     // floorWidth = floorWidth + (current.rightWall.posX - prev.rightwall.posX)
     // floor.posX = floor.posX + ((current.rightWall.posX - prev.rightwall.posX) / 2)
     
     // - Top Wall
     // floorHeight = floorHeight - (current.topWall.posZ - prev..topWall.posZ)
     // floor.posZ = floor.posZ + ((current.topWall.posZ - prev..topWall.posZ) / 2)
     
     // - Right Wall
     // floorHeight = floorHeight + (current.bottomWall.posZ - prev.bottomWall.posZ)
     // floor.posZ = floor.posZ + ((current.bottomWall.posZ - prev.bottomWall.posZ) / 2)


export const Room = ({ setShape, unique}) =>{
     const [ objects, conv, scale, ortho] = 
     useStore((state) => [ state.objects, state.conv, state.scale, state.ortho]);
     
     let objInstance = objects.find(o => o.key === unique);

     let conversion = conv;

     if (objInstance) {
          return (
               <>
                    {/* Ceiling (soon) - off on ortho mode */}
                    {/* <Ceil
                         instance={objInstance}
                         unique={unique}
                         conversion={conversion}
                    /> */}
                    {/* Floor */}
                    <Floor
                         instance={objInstance}
                         unique={unique}
                         conversion={conversion}
                         scale={scale}
                         ortho={ortho}
                    />
                    {/* Top */}
                    <Wall
                         instance={objInstance}
                         unique={unique}
                         rotY={Math.PI/2}
                         conversion={conversion}
                         scale={scale}
                         ortho={ortho}
                         wallNo={0}
                    />
                    {/* Left */}
                    <Wall
                         instance={objInstance}
                         unique={unique}
                         rotY={0}
                         conversion={conversion}
                         scale={scale}
                         ortho={ortho}
                         wallNo={1}
                    />
                    {/* Right */}
                    <Wall
                         instance={objInstance}
                         unique={unique}
                         rotY={0}
                         conversion={conversion}
                         scale={scale}
                         ortho={ortho}
                         wallNo={2}
                    />
                    {/* Bottom */}
                    <Wall
                         instance={objInstance}
                         unique={unique}
                         rotY={Math.PI/2}
                         conversion={conversion}
                         scale={scale}
                         ortho={ortho}
                         wallNo={3}
                    />
               </>
          );
     } else{
          // console.log('Left the chat');
          return null;
     }
}