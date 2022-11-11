import create from 'zustand';
import { nanoid } from 'nanoid';
import React, { useState, useRef, useEffect } from 'react';


const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) =>
     window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create((set) => ({
     // Default texture
     // texture: '#ff00e0',
     texture: 'blank',
     iniScale: 'metric',
     iniDim: [12,12,12],
     // iniConv: 1,
     iniPos: [0,0,0],
     iniShape: '#BFBFBF',
     playerIni: [0,3,10],
     

     // Check for objects in localStorage
     objects: getLocalStorage('world') || [],
     
     // add whatever is requested
     addObj: (texture, shape, objType) =>{
          // var addState = true;
          set((state) => ({
               objects: [...state.objects,
                    { 
                         key: nanoid(), 
                         pos: state.iniPos,
                         // dimensions: state.iniDim,
                         dimTemp: [1,1,1],
                         scale: state.iniScale,
                         objNo: state.objects.length,
                         objType: objType,
                         shape: shape,
                         color: state.iniShape,
                         texture: state.texture,
                         playerLoc: state.playerIni,
                         // scale: 120,
                         // texture: texture,
                         active: 'none',
                         textureMenu: false,
                         textureOptions: false,
                         matType: 'Plain',
                         ortho: true
                    },
               ]
          }))
     },

     // remove the specified object
     removeObj: (curPos) => {
          set((state) => ({
               objects: state.objects.filter((object) => {
                    const objPos = object.pos;
                    return objPos !== curPos;
               }),
          }));
     },

     // Set object position state
     // https://plainenglish.io/blog/using-zustand-and-typescript-to-make-a-to-do-list-in-react
     setPos: (curPos, id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                         ? ({...object, pos: curPos})
                         : object
               ),
          }))
     },

     changeColor: (curColor, id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                         ? ({...object, color: curColor})
                         : object
               ),
          }))
     },
     changeTexture: (curTexture, id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                         ? ({...object, texture: curTexture})
                         : object
               ),
          }))
     },
     setMatType: (type, id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                         ? ({...object, matType: type})
                         : object
               ),
          }))
     },

     // Set dimensions of the object
     setDimTemp: (temp, id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                         ? ({...object, dimTemp: temp})
                         : object
               ),
          }))
     },

     // Makes the object's own attribute menu appear (and closes all others)
     setActive: (id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                    // object.objNo === id
                         ? ({...object, active: 'grid'})
                         : ({...object, active: 'none'})
               ),
          }))
     },
     setTextureMenu: (id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                    // object.objNo === id
                         ? ({...object, textureMenu: true})
                         : ({...object, textureMenu: false})
               ),
          }))
     },
     setTextureOptions: (id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                    // object.objNo === id
                         ? ({...object, textureOptions: true})
                         : ({...object, textureOptions: false})
               ),
          }))
     },

     // Sets the ortho mode
     setOrtho: (cam) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.ortho !== cam
                    // object.objNo === id
                         ? ({...object, ortho: cam})
                         : object
               ),
          }))
     },

     // Sets the scale of the canvas
     setScale: (scale) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.scale !== scale
                    // object.objNo === id
                         ? ({...object, scale: scale})
                         : object
               ),
          }))
     },
     // Sets the conversion of the dimensions
     convDimensions: (newDim) =>{
          set((state) =>({
               iniDim : newDim
          }))
     },

     // set specified object's texture
     setTexture: (texture) => {
          set((state) => ({
               texture,
          }));
     },

     // save world to local storage
     saveWorld: () =>{
          set((state) => {
               setLocalStorage('world', state.objects);
          })
     }
}));


// const addNew = (e) =>{
//      var addState = isOrtho;
//      shapeCount = isShape.length;
//      const shape = e.target.getAttribute("data-shape");
//      if(addState){
//        console.log(addState);
//      }


//      if(!isOrtho){
//        toggleCam();
//        addState = !addState;
//      }
//      // console.log("within addnew: "+isOrtho);
//      toggleClass();
//      setShape([
//        ...isShape, <Shape isOrtho={addState} setShape={shape} nkey={shapeCount} rem={removeObj} />
//      ]);
//      // setShape([
//      //   ...isShape, 
//      //   {
//      //     setShape: shape,
//      //     nkey: shapeCount
//      //   }
//      // ]);
//    }
//    const removeObj = () =>{
//      const newList = isShape.filter((item) => item.nkey !== 0)
//      setShape(newList);
//      // alert(k)
//    }