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
     fixtures: getLocalStorage('fixtures') || [],             //array of fixture objects

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
                         dimTemp: [1,1,1],        //multiplier of the scale standard (conv)
                         objType: objType,        //type of object
                         shape: shape,            //shape (or name) of object
                         color: state.iniColor,   //color of object
                         texture: state.texture,  //texture of object
                         // Indiviual object's attribute menu states
                         active: 'none',          //state of object's MinSelect
                         resize: 'none',          //state of object's Resizer
                         attrMenu: 'none',        //state of object's Attribute menu
                         furnishMenu: 'none',     //state of object's Furnish Menu
                         wallMenu: 'none',        //state of object's Walls Menu
                         matType: 'Plain',        //texture option selected
                         // Wall attributes
                         wall: [1,2,3,4],         //array of walls
                         wallPos: [               //array of position of each wall
                              [state.iniPos[0], state.iniPos[1], state.iniPos[2]],
                              [state.iniPos[0], state.iniPos[1], state.iniPos[2]],
                              [state.iniPos[0], state.iniPos[1], state.iniPos[2]],
                              [state.iniPos[0], state.iniPos[1], state.iniPos[2]],
                         ],
                         wallDimTempX: [          //array of dimTemp of each wall's thickness
                              0.068,0.068,0.068,0.068
                         ],
                         wallDimTempZ: [1,1,1,1], //array of dimTemp of each wall's width
                         wallDimTempY: [1,1,1,1], //array of dimTemp of each wall's height
                         activeWallNo: null,      //wall actively being used
                         wallTexture: [           //texture of wall
                              state.texture,
                              state.texture,
                              state.texture,
                              state.texture
                         ],
                         wallColor: [           //color of wall
                              state.iniColor,
                              state.iniColor,
                              state.iniColor,
                              state.iniColor
                         ],
                         
                         // objType: objType,        //type of object
                         // shape: shape,            //shape (or name) of object
                         // color: state.iniColor,   //color of object
                         // texture: state.texture,  //texture of object
                         // // Indiviual object's attribute menu states
                         // active: 'none',          //state of object's attribute menu
                         // textureOptions: false,   //if object's texture options list is shown
                         // textureMenu: false,      //if object's texture options are selected
                         // matType: 'Plain',        //texture option selected
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
     // Makes the object's own MinSelect appear (and closes all others)
     setActive: (id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                         ? ({...object, active: 'grid'})
                         : ({...object, active: 'none'})
               ),
          }))
     },
     // Makes the object's own Resizer appear (and closes all others)
     setResize: (id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                         ? ({...object, resize: 'grid'})
                         : ({...object, resize: 'none'})
               ),
          }))
     },
     // Makes the object's own Attribute menu appear (and closes all others)
     setAttrMenu: (id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                         ? ({...object, attrMenu: 'grid'})
                         : ({...object, attrMenu: 'none'})
               ),
          }))
     },
     // Makes the object's own Furnishing menu appear (and closes all others)
     setFurnishMenu: (id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                         ? ({...object, furnishMenu: 'grid'})
                         : ({...object, furnishMenu: 'none'})
               ),
          }))
     },
     // Makes the object's own Walls Menu appear (and closes all others)
     setWallMenu: (id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                         ? ({...object, wallMenu: 'grid'})
                         : ({...object, wallMenu: 'none'})
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
     removeObj: (id) => {
          set((state) => ({
               objects: state.objects.filter((object) => object.key !== id)
               }),
          );
     },

     // ----- Wall Properties Management
     // Set obj position state
     setWallPos: (curPos, index, id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                         // ? ({...object, wallPos: state.objects.wallPos.map((wall) =>
                         //      wall[index] = curPos
                         // )})
                         ? ({...object, wallPos: curPos})
                         : object
               ),
          }))
     },
     setActiveWallNo: (id, wallNo) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                         ? ({...object, activeWallNo: wallNo})
                         : ({...object, activeWallNo: null})
               ),
          }))
     },
     // Set wall color
     changeWallColor: (curColor, id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                         ? ({...object, wallColor: curColor})
                         : object
               ),
          }))
     },
     // Set wall texture
     changeWallTexture: (curTexture, id) =>{
          set((state) =>({
               objects: state.objects.map((object) =>
                    object.key === id
                         ? ({...object, wallTexture: curTexture})
                         : object
               ),
          }))
     },

     //Add New Fixtures
     addFixture: (wallNo, fixType, id, dim, col, text) =>{
          set((state) =>({
               fixtures: [...state.fixtures, 
                    {
                         key: nanoid(),
                         objId: id,
                         wallNum: wallNo,
                         type: fixType,
                         pos: state.iniPos,
                         dimTemp: dim,
                         color: col,   //color of fixture
                         texture: text,  //texture of fixture
                    }
               ]
          }))
     },

     // Set fixture color
     changeFixColor: (curColor, id) =>{
          set((state) =>({
               fixtures: state.fixtures.map((fix) =>
                    fix.key === id
                         ? ({...fix, color: curColor})
                         : fix
               ),
          }))
     },
     // Set fixture texture
     changeFixTexture: (curTexture, id) =>{
          set((state) =>({
               fixtures: state.fixtures.map((fix) =>
                    fix.key === id
                         ? ({...fix, texture: curTexture})
                         : fix
               ),
          }))
     },

     // Set standard dimension multiplier of the fixture
     setFixDimTemp: (temp, id) =>{
          set((state) =>({
               fixtures: state.fixtures.map((fix) =>
                    fix.key === id
                         ? ({...fix, dimTemp: temp})
                         : fix
               ),
          }))
     },

     // Set Fixture Position
     setFixPos: (curPos, id) =>{
          set((state) =>({
               fixtures: state.fixtures.map((fix) =>
                    fix.key === id
                         ? ({...fix, pos: curPos})
                         : fix
               ),
          }))
     },

     // remove the specified fixture
     removeFix: (id) => {
          set((state) => ({
               fixtures: state.fixtures.filter((fix) => fix.key !== id)
               }),
          );
     },

     // save fixtures to local storage
     saveFixtures: () =>{
          set((state) => {
               setLocalStorage('fixtures', state.fixtures);
          })
     },

     // reset fixtures in local storage to empty
     resetFixtures: () =>{
          // Empty but fixtures state
          set(() => ({
               fixtures: []
          }))
          // Set fixtures Storage as empty
          set((state) => {
               setLocalStorage('fixtures', []);
          })
     },

}));