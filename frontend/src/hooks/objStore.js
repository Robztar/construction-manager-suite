import create from 'zustand';
import { nanoid } from 'nanoid';
// import React, { useState, useRef, useEffect } from 'react';


const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) =>
     window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create((set) => ({
     ortho: true,             // default canvas camera state
     scale: 'metric',         // default measurement scale
     conv: 12,                // default (metric) measurement standard 
     // iniDim: [12,12,12],
     iniPos: [0,0,0],         // default object position
     iniColor: '#BFBFBF',   // default color
     texture: 'blank',        // default texture

     // New fields coming soon...

     // Check for objects in localStorage
     objects: getLocalStorage('world') || [],
     
     // add whatever is requested
     addObj: (texture, shape, objType) =>{
          set((state) => ({
               objects: [...state.objects,
                    { 
                         // scale: state.scale,      //measurement scale in use
                         key: nanoid(),           //unique identifier
                         pos: state.iniPos,       //position of object
                         dimTemp: [1,1,1],        //multiplier of the scale standard (iniDim)
                         objType: objType,        //type of object
                         shape: shape,            //shape (or name) of object
                         color: state.iniColor,   //color of object
                         texture: state.texture,  //texture of object
                         // Indiviual object's attribute menu states
                         active: 'none',          //state of object's attribute menu
                         textureOptions: false,   //if object's texture options list is shown
                         textureMenu: false,      //if object's texture options are selected
                         matType: 'Plain',        //texture option selected
                    },
               ]
          }))
     },

//------- Project-wide Procedures --------
     // save world to local storage
     saveWorld: () =>{
          set((state) => {
               setLocalStorage('world', state.objects);
          })
     },

     // reset world in local storage to empty
     resetWorld: () =>{
          // Empty but objects
          set(() => ({
               objects: []
          }))
          // Set world as empty
          set((state) => {
               setLocalStorage('world', []);
          })
     },

     // Updates with the current ortho mode
     switchOrtho: (cam) =>{
          set((state) =>({
               ortho : cam
          }))
     },

     // Sets the measurement scale of the canvas
     switchScale: (newScale) =>{
          set((state) =>({
               scale : newScale
          }))
     },

     // Sets the conversion of the standard scale dimensions
     switchConv: (newConv) =>{
          set((state) =>({
               conv : newConv
          }))
     },

// ----- Object Menu Management -----
     // Makes the object's own attribute menu appear (and closes all others)
     setActive: (id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                         ? ({...object, active: 'grid'})
                         : ({...object, active: 'none'})
               ),
          }))
     },
     // sets the mode of the texture options window's mode
     setTextureOptions: (id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                         ? ({...object, textureOptions: true})
                         : ({...object, textureOptions: false})
               ),
          }))
     },
     // Sets the texture window's mode
     setTextureMenu: (id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                         ? ({...object, textureMenu: true})
                         : ({...object, textureMenu: false})
               ),
          }))
     },
     // Sets the type of the current texture window
     setMatType: (type, id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                         ? ({...object, matType: type})
                         : object
               ),
          }))
     },
     
// ----- Object Properties Management -----
     // Set obj position state
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

     // Set obj color
     changeColor: (curColor, id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                         ? ({...object, color: curColor})
                         : object
               ),
          }))
     },
     // Set obj texture
     changeTexture: (curTexture, id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                         ? ({...object, texture: curTexture})
                         : object
               ),
          }))
     },

     // Set standard dimension multiplier of the object
     setDimTemp: (temp, id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                         ? ({...object, dimTemp: temp})
                         : object
               ),
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

}));