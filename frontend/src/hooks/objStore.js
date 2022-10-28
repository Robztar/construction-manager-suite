import create from 'zustand';
import { nanoid } from 'nanoid';
import React, { useState, useRef, useEffect } from 'react';


const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) =>
     window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create((set) => ({
     // Default texture
     // texture: 'concrete',
     iniPos: [0,1,0],

     // Check for objects in localStorage
     objects: getLocalStorage('world') || [],
     
     // add whatever is requested
     addObj: (texture, shape) =>{
          var addState = true;
          set((state) => ({
               objects: [...state.objects,
                    { 
                         key: nanoid(), 
                         pos: state.iniPos, 
                         objNo: state.objects.length,
                         shape: shape,
                         // texture: state.texture 
                         texture: texture,
                         active: 'none'
                    },
               ]
          }))
     },

     // remove the specified object
     // removeObj: (x, y, z) => {
     //      set((state) => ({
     //           objects: state.objects.filter((object) => {
     //                const [_x, _y, _z] = object.pos;
     //                return _x !== x || _y !== y || _z !== z;
     //           }),
     //      }));
     // },

     removeObj: (id) =>{
          set((state) =>({
               objects: state.objects.filter((object) => {
                    const key = object.key;
                    return key === id;
               })
          }))
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
          // set((state) =>({
          //      objects: state.objects.filter((object) => {
          //           const key = object.key;
          //           object.pos = curPos;
          //           return key === id;
          //      })
          // }))
     },

     // Makes the object's own attribute menu appear (and closes all others)
     setActive: (id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                    // object.objNo === id
                         ? ({...object, active: 'flex'})
                         : ({...object, active: 'none'})
               ),
          }))
     },
     setNotActive: (id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                    // object.objNo === id
                         ? ({...object, active: 'none'})
                         : object
               ),
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