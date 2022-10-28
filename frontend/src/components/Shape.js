import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
// https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
//  - Ecosystem: List of libraries that may be useful:
          // GLTFs into JSX
          // Postprocessing (idk)
          // flexbox (idk)
          // zustand (STATE MANAGEMENT)
          // mouse/touch gestures (useDrag)
import { Html } from '@react-three/drei';
// Helped with HTML inclusion - https://stackoverflow.com/questions/69785504/how-to-add-a-jsx-component-inside-a-react-three-fiber-canvas
// import { Html, ScrollControls, Scroll } from '@react-three/drei'
import * as THREE from 'three';

// -------Bug Alert-------
// If component is rendered in the list-of-components form:
     // Movement works in Ortho & Persp mode
     // Mode-switch will not update component
     // Objects have their states saved
// If component is rendered with map-list form:
     // Movement works in Ortho mode only
     // Mode-switch updates on each time mode is switched
     // Objects revert to default states
     // NOTE!!!: Check this:
     // https://beta.reactjs.org/apis/react/useState#:~:text=Show%20more-,Storing%20information%20from%20previous%20renders,-Usually%2C%20you%20will
     // Maybe this:
     // https://www.robinwieruch.de/react-remove-item-from-list/


     // ------Way forward--------
// Leave it in list-ofcomponents form for now
// Object states will be saved in useStore (later date).
     // Check old cube/room code
// Include 'remove component' functionality
     // https://beta.reactjs.org/learn/updating-arrays-in-state
     // https://codepen.io/kaolay/pen/bqKjVz
// Include 'update component' functionality
     // https://beta.reactjs.org/learn/updating-arrays-in-state
// Adding an attribute menu
     // https://www.freecodecamp.org/news/pass-data-between-components-in-react/
     // https://www.youtube.com/watch?v=5SrcXNkD10M (dat.gui)

// Few problems (Getting better):
// Movement still works in Perspective mode
     // If an object is added while in ortho mode, 
      // it can move in both ortho and persp mode
     // If an object is added while in persp mode,
     //  it cannot be moved either in ortho or persp mode

// Need to have object attribute menu (Dat GUI time)
 // Need to have a button/command that removes the relevant object

// function removeObj(){
//      alert('works');
// }


// Should appear on click
const PopMenu = () =>{
     // const locate = "top: " + 2;
     // const locate = "position: "+ pos;
     return(
          {/* <div style={locate} className=''></div> */}
     )
}


export const Shape = ({ isOrtho, setShape, nkey, rem, pos, texture, setPos}) =>{
     const ref = useRef();
     let posi = pos;
     // let posi = [0,1,0];
     // var mouseLoc = {x:0,z:0};
     var mouseLoc = {x:posi[0],z:posi[2]};
     var yAxis = posi[1];
     // var yAxis = 1;

     const Attribute = ({rem}) =>{
          // R3F mouse events
          // https://docs.pmnd.rs/react-three-fiber/api/events
          return(
               <div 
                    className='float attr-cont'
                    // onPointerLeave={() => 
                    //      document.addEventListener('click', () =>
                    //                // alert('missed')
                    //                console.log('missed')
                    //      )
                    // }
               >
                    <h3 className='attr-title'>
                         Attribute Menu
                    </h3>
                    <div className='attr-menu'>
                         <div className='attr-n obj-remove' onClick={rem}>
                              Remove
                         </div>
                         <div 
                              className='attr-li' 
                              onClick={()=>{
                              // changeColor
                                   ref.current.material.color.set('blue');
                              }}
                         >
                              <div className='attr-n'>
                                   Color
                              </div>
                              <div className='attr-t'></div>
                         </div>
                    </div>
               </div>
          )
     }

     // Can fix this default positioning later on
     if(nkey % 2 ===0 ? mouseLoc.z = mouseLoc.z+(nkey/2): mouseLoc.x = mouseLoc.x+(nkey/2));
     // console.log(mouseLoc.z +' '+mouseLoc.x);

     // Mouse-move Funtionality
     function onMouseMove(event) {
          if(isOrtho){
               mouseLoc.x = (event.clientX / window.innerWidth) * 2 - 1;
               mouseLoc.z = - (event.clientY / window.innerHeight) * 2 + 1;
     
               mouseLoc.x = Math.round(mouseLoc.x * window.innerWidth* 1.25)/100;
               mouseLoc.z = Math.round(mouseLoc.z * window.innerHeight *-1.25)/100;
     
               // Grid-locking can be made optional
               mouseLoc.x = Math.round(mouseLoc.x) + posi[0];
               mouseLoc.z = Math.round(mouseLoc.z) + posi[2];
               // setPos(mouseLoc.x,yAxis,mouseLoc.z);
               // setRef({
               //      x: mouseLoc.x,
               //      y: 1,
               //      z: mouseLoc.z
               // });
               // Can also create a movement limiter based on grid (and Ground) size
          }
     }

     // const [addItem, setItemState] = useState(true);
     // function firstAdd(){
     //      if(addItem ? setItemState(false) : null);
     // }
     // if(addItem ? document.addEventListener('mousemove',onMouseMove,false) : document.removeEventListener('mousemove',onMouseMove,false));
     const allColors = {
          box : 'red',
          sphere : 'blue'
     }
     const allShapes = {
          box : new THREE.BoxBufferGeometry(1,1,1),
          sphere : new THREE.SphereBufferGeometry(0.5,16,16)
     }
     useFrame((state) => {
          ref.current.position.set(mouseLoc.x, yAxis, mouseLoc.z);
          // ref.current.material.color.set('blue');
     });

     return (
          <>
               <mesh 
                    ref = {ref}
                    className={'object-box'}
                    // onClick={firstAdd} 
                    onPointerDown={(event) =>{
                         event.stopPropagation();
                         // console.log(isOrtho);
                         document.addEventListener('mousemove', onMouseMove);
                         // if(isOrtho? document.addEventListener('mousemove', onMouseMove) : null);
                    }} 
                    onPointerUp={(event) =>{
                         event.stopPropagation();
                         // console.log('stop');
                         document.removeEventListener('mousemove',onMouseMove);
                    }}
                    onClick={()=>{
                         if (document.getElementsByClassName("attr-cont")[0].style.display === 'none') {
                              // console.log('i see you');
                              document.getElementsByClassName("attr-cont")[0].style.display = 'flex';
                         } else {
                              document.getElementsByClassName("attr-cont")[0].style.display = 'none';
                         }
                    }}
               >
                    <primitive object={allShapes[setShape]} attach="geometry" />
                    {/* <boxBufferGeometry attach="geometry" args={[1, 1, 1]} /> */}
                    {/* <meshNormalMaterial attach="material" /> */}
                    <meshStandardMaterial attach="material" color={allColors[setShape]} />
               </mesh>
               <Html>
                    <Attribute rem={rem} nkey={nkey} />
               </Html>
          </>
     );
}