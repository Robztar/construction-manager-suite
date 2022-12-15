import { useStore } from '../../hooks/objStore';
import { useState } from 'react';

export const Attribute = () =>{
     const [ objects, projects,
          changeColor, 
          changeTexture,
          setAttrMenu, 
          removeObj,
          setMatType,
          setDimTemp,
          setRotation,
     ] = useStore((state) => [ state.objects, state.projects,
          state.changeColor,
          state.changeTexture,
          state.setAttrMenu,
          state.removeObj,
          state.setMatType,
          state.setDimTemp,
          state.setRotation,
     ]);
     
     const[textureOptions,setOptions] = useState(false);    // Texture Options Menu
     const[textureMenu,setTextureMenu] = useState(false);   // Textures / Colors Menu
     const[propMenu,setPropMenu] = useState(false);    // Properties Menu


     let objInstance = objects.find(o => o.attrMenu === 'grid');
     let dimensions;
     let actUnits;
     let actSubUnits;

     if(objInstance){
          let unique = objInstance.key;
          let projInstance = projects.find(p => p.key === objInstance.projId);
          let scale = projInstance.scale;
          let conversion = projInstance.conversion;

          let rotationY = objInstance.rotationY;
          dimensions = [
               objInstance.dimTemp[0]*conversion,
               objInstance.dimTemp[1]*conversion,
               objInstance.dimTemp[2]*conversion
          ];
          if(scale === 'metric'){
               actUnits = [dimensions[0]/4,dimensions[1]/4,dimensions[2]/4];
               actSubUnits = [
                    // X-axis
                    [
                         Math.floor(actUnits[0]), //metre
                         Math.floor((actUnits[0] % 1) * 100),   //cm
                         // Math.floor((actUnits[0] % 0.01) * 1000)  //mm
                         Math.floor((((actUnits[0] % 1) * 100) % 1) * 10)  //mm
                    ],
                    // Y-axis
                    [
                         Math.floor(actUnits[1]), //metre
                         Math.floor((actUnits[1] % 1) * 100),   //cm
                         Math.floor((((actUnits[1] % 1) * 100) % 1) * 10)  //mm
                    ],
                    // Z-axis
                    [
                         Math.floor(actUnits[2]), //metre
                         Math.floor((actUnits[2] % 1) * 100),   //cm
                         Math.floor((((actUnits[2] % 1) * 100) % 1) * 10)  //mm
                    ],
               ];
               // console.log("Width is "+ actSubUnits[0][0]+"m, "+actSubUnits[0][1]+"cm, "+actSubUnits[0][2]+"mm.");
          }else if (scale === 'imperial'){
               actUnits = [dimensions[0],dimensions[1],dimensions[2]];
               actSubUnits = [
                    // X-axis
                    [
                         Math.floor(actUnits[0]), //foot
                         Math.floor((actUnits[0] % 1) * 12),   //in
                         Math.floor((((actUnits[0] % 1) * 12) % 1) * 16)  //fract
                    ],
                    // Y-axis
                    [
                         Math.floor(actUnits[1]), //foot
                         Math.floor((actUnits[1] % 1) * 12),   //in
                         Math.floor((((actUnits[1] % 1) * 12) % 1) * 16)   //fract
                    ],
                    // Z-axis
                    [
                         Math.floor(actUnits[2]), //metre
                         Math.floor((actUnits[2] % 1) * 12),   //in
                         Math.floor((((actUnits[2] % 1) * 12) % 1) * 16)  //fract
                    ],
               ];
               // console.log("Width is "+ actSubUnits[0][0]+"ft, "+actSubUnits[0][1]+" , "+actSubUnits[0][2]+"in.");
          }

          // Texture Attribute Management
          let colorAttr = objInstance.color;
          let textureAttr = objInstance.texture;
          let matType = objInstance.matType;

          return(
               <div 
                    className='float attr-cont'
                    style={{'display': objInstance.attrMenu}}
               >
                    <div className="attr-head">
                         <h3 className='attr-title'>
                              Attribute Menu
                         </h3>
                         <i 
                              className="fas fa-times attr-exit"
                              onClick={()=>{
                                   setAttrMenu('');
                                   setOptions(false);
                                   setTextureMenu(false);
                                   setPropMenu(false);
                              }}
                         ></i>
                    </div>
                    <div className='attr-menu'>
                         <div 
                              className={`attr-li 
                                   ${ textureMenu || textureOptions ? 'active' : ''}
                                   ${ propMenu ? 'inactive' : ''}
                              `}
                         >
                              {(() =>{ 
                                   if(textureOptions){
                                        return(
                                             <div className='types-li'>
                                                  <div className='type-row'
                                                       onClick={(e) =>{
                                                            e.stopPropagation();
                                                            setOptions(false);
                                                            setTextureMenu(true);
                                                            setMatType('Plain',unique);
                                                            // console.log('Options active: ' + textureOptions);
                                                       }}
                                                  >Plain</div>
                                                  <div className='type-row'
                                                       onClick={(e) =>{
                                                            e.stopPropagation();
                                                            setOptions(false);
                                                            setTextureMenu(true);
                                                            setMatType('Wood',unique);
                                                       }}
                                                  >Wood</div>
                                                  <div className='type-row'
                                                       onClick={(e) =>{
                                                            e.stopPropagation();
                                                            setOptions(false);
                                                            setTextureMenu(true);
                                                            setMatType('Stone',unique);
                                                       }}
                                                  >Stone</div>
                                                  <div className='type-row'
                                                       onClick={(e) =>{
                                                            e.stopPropagation();
                                                            setOptions(false);
                                                            setTextureMenu(true);
                                                            setMatType('Glass',unique);
                                                       }}
                                                  >Glass</div>
                                                  <div className='type-row cancel'
                                                       onClick={(e) =>{
                                                            e.stopPropagation();
                                                            setOptions(false);
                                                       }}
                                                  >Cancel</div>
                                             </div>
                                        )
                                   } else if(textureMenu){ 
                                        if(matType === 'Plain'){
                                        return(
                                             <div className='color-li'>
                                                  {/* Menu Head */}
                                                  <div className='type-head'> 
                                                       <div className='type-title'>Plain</div> 
                                                       <div className='cancel-row'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 setTextureMenu(false);
                                                            }}
                                                       >Cancel</div>
                                                  </div>
                                                  {/* Tint Row */}
                                                  <div className='color-row tint'>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': 'white'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'white';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                                 console.log('current color is: ' + objInstance.color);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#BFBFBF'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#BFBFBF';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#808080'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#808080';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#404040'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#404040';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': 'black'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'black';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                  </div>
                                                  {/* Red Row */}
                                                  <div className='color-row red'>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#FFCCCC'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#FFCCCC';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#FF6666'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#FF6666';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': 'red'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#FF0000';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#990000'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#990000';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#330000'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#330000';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                  </div>
                                                  {/* Orange Row */}
                                                  <div className='color-row orange'>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#FFE5CC'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#FFE5CC';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#FFB266'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#FFB266';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': 'orange'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'orange';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#994C00'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#994C00';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#331900'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#331900';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                  </div>
                                                  {/* Yellow Row */}
                                                  <div className='color-row yellow'>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#FFFFCC'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#FFFFCC';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#FFFF66'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#FFFF66';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': 'yellow'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'yellow';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#999900'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#999900';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#333300'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#333300';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                  </div>
                                                  {/* Lime Row */}
                                                  <div className='color-row lime'>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#CCFFCC'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#CCFFCC';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#66FF66'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#66FF66';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': 'lime'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'lime';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#009900'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#009900';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#003300'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#003300';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                  </div>
                                                  {/* Aqua Row */}
                                                  <div className='color-row aqua'>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#CCFFE5'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#CCFFE5';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#66FFB2'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#66FFB2';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#00FF80'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#00FF80';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#00994C'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#00994C';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#003319'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#003319';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                  </div>
                                                  {/* Cyan Row */}
                                                  <div className='color-row cyan'>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#CCFFFF'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#CCFFFF';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#66FFFF'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#66FFFF';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': 'cyan'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'cyan';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#009999'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#009999';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#003333'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#003333';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                  </div>
                                                  {/* Blue Row */}
                                                  <div className='color-row blue'>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#CCCCFF'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#CCCCFF';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#6666FF'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#6666FF';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': 'blue'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'blue';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#000099'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#000099';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#000033'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#000033';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                  </div>
                                                  {/* Magenta/Purple Row */}
                                                  <div className='color-row magenta'>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#FFCCFF'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#FFCCFF';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#FF66FF'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#FF66FF';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': 'magenta'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'magenta';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': 'purple'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'purple';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#330033'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#330033';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                  </div>
                                                  {/* Pink Row */}
                                                  <div className='color-row pink'>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#FFCCE5'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#FFCCE5';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#FF66B2'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#FF66B2';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#FF007F'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#FF007F';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#99004C'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#99004C';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#330019'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#330019';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                  </div>
                                             </div>
                                        )}
                                        if(matType === 'Wood'){
                                        return(
                                             <div className='texture-li'>
                                                  {/* Menu Head */}
                                                  <div className='type-head'> 
                                                       <div className='type-title'>Wood</div> 
                                                       <div className='cancel-row'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 setTextureMenu(false);
                                                            }}
                                                       >Cancel</div>
                                                  </div>
                                                  {/* Wood Row1 */}
                                                  <div className='texture-row'>
                                                       <div 
                                                            className='texture-item t-wood'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'white';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('wood', unique);
                                                                 setTextureMenu(false);
                                                                 console.log('current texture is: ' + textureAttr);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='texture-item t-worn-wood'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'white';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('wornWood', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                  </div>
                                                  {/* Wood Row2 */}
                                                  <div className='texture-row'>
                                                       <div 
                                                            className='texture-item t-plywood'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'white';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('plywood', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='texture-item t-laminate'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'white';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('laminate', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                  </div>
                                             </div>
                                        )}
                                        if(matType === 'Stone'){
                                        return(
                                             <div className='texture-li'>
                                                  {/* Menu Head */}
                                                  <div className='type-head'> 
                                                       <div className='type-title'>Stone</div> 
                                                       <div className='cancel-row'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 setTextureMenu(false);
                                                            }}
                                                       >Cancel</div>
                                                  </div>
                                                  {/* Stone Row1 */}
                                                  <div className='texture-row'>
                                                       <div 
                                                            className='texture-item t-concrete'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'white';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('concrete', unique);
                                                                 setTextureMenu(false);
                                                                 console.log('current texture is: ' + textureAttr);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='texture-item t-bf-concrete'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'white';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('bfConcrete', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                  </div>
                                                  {/* Stone Row2 */}
                                                  <div className='texture-row'>
                                                       <div 
                                                            className='texture-item t-stone'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'white';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('stone', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='texture-item t-brick'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'white';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('brick', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                  </div>
                                             </div>
                                        )}
                                        if(matType === 'Glass'){
                                        return(
                                             <div className='texture-li'>
                                                  {/* Menu Head */}
                                                  <div className='type-head'> 
                                                       <div className='type-title'>Glass</div> 
                                                       <div className='cancel-row'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 setTextureMenu(false);
                                                            }}
                                                       >Cancel</div>
                                                  </div>
                                                  {/* Glass Row1 */}
                                                  <div className='texture-row'>
                                                       <div 
                                                            className='t-glass'
                                                            style={{'background': '#add8e6'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#add8e6';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('glass', unique);
                                                                 setTextureMenu(false);
                                                                 console.log('current texture is: ' + textureAttr);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='t-glass'
                                                            style={{'background': 'black'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'black';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('glass', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                  </div>
                                                  {/* Glass Row2 */}
                                                  <div className='texture-row'>
                                                       <div 
                                                            className='t-glass'
                                                            style={{'background': 'red'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'red';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('glass', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='t-glass'
                                                            style={{'background': 'orange'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'orange';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('glass', unique);
                                                                 setTextureMenu(false);
                                                            }}
                                                       ></div>
                                                  </div>
                                             </div>
                                        )}

                                   } else {
                                        return(
                                             <div className='attr-n'
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       setOptions(true);
                                                       console.log('Options active: ' + textureOptions);
                                                  }}
                                             >Floor Texture</div>
                                        )
                                   }
                              }) () }

                         </div>

                         {/* ----- Changing Object Properties ----- */}
                         <div 
                              className={`attr-li 
                                   ${ propMenu ? 'active' : ''} 
                                   ${ textureMenu || textureOptions ? 'inactive' : ''}
                              `}
                         >
                              {/* {(() =>{ }) () } */}
                              {(() =>{ 
                                   if(propMenu){
                                        return(
                                             <div className='props-li'>
                                                  <div className='props-head'>
                                                       <div className='props-type'>Properties</div>
                                                       <div className='props-done'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 setPropMenu(false);
                                                            }}
                                                       ><i className="fas fa-check-circle"></i></div>
                                                  </div>
                                                  
                                                  <div className='props-opts'>
                                                       <div className='prop'>
                                                            <label className='prop-n'>Width</label>
                                                            <div className='prop-fields'>
                                                                 <input 
                                                                      className='prop-input'
                                                                      id="width-l"
                                                                      type="number"
                                                                      min='0' 
                                                                      value={actSubUnits[0][0]}
                                                                      step="1"
                                                                      onChange={(e) =>{
                                                                           if (e.target.value === '') {
                                                                                e.target.value = 0
                                                                           }
                                                                           let lg = parseInt(e.target.value);
                                                                           let med = actSubUnits[0][1]
                                                                           let sm = actSubUnits[0][2] + 0.1;
                                                                           let tot;
                                                                           let rDimTemp;
                                                                           if(scale === 'metric'){
                                                                                tot = lg + (med/100) + (sm/1000);
                                                                                // console.log("Width is "+lg+"m, "+med+"cm, "+sm+"mm.");
                                                                                // console.log("Total Width is " + tot);
                                                                                rDimTemp=[tot/3, actUnits[1]/3,actUnits[2]/3];
                                                                           }else if(scale === 'imperial'){
                                                                                let ret_sm = sm/(12*16);
                                                                                tot = lg + (med/12) + (ret_sm);
                                                                                // console.log("Width is "+lg+"ft, "+med+" and "+sm+"/16 in.");
                                                                                // console.log("Total Width is " + tot);
                                                                                rDimTemp=[tot/10, actUnits[1]/10,actUnits[2]/10];
                                                                           }
                                                                           setDimTemp(rDimTemp, unique);
                                                                      }}
                                                                 />
                                                                 <input 
                                                                      className='prop-input'
                                                                      id="width-m"
                                                                      type="number"
                                                                      min='0' 
                                                                      max='100'
                                                                      value={actSubUnits[0][1]}
                                                                      step="1"
                                                                      onChange={(e) =>{
                                                                           if (e.target.value === '') {
                                                                                e.target.value = 0
                                                                           }
                                                                           let lg = actSubUnits[0][0];
                                                                           let med = parseInt(e.target.value);
                                                                           let sm = actSubUnits[0][2] + 0.1;
                                                                           let tot;
                                                                           let rDimTemp;
                                                                           if(scale === 'metric'){
                                                                                tot = lg + (med/100) + (sm/1000);
                                                                                rDimTemp=[tot/3, actUnits[1]/3,actUnits[2]/3]
                                                                           }else if(scale === 'imperial'){
                                                                                let ret_sm = sm/(12*16);
                                                                                tot = lg + (med/12) + (ret_sm);
                                                                                rDimTemp=[tot/10, actUnits[1]/10,actUnits[2]/10]
                                                                           }
                                                                           setDimTemp(rDimTemp, unique);
                                                                      }}
                                                                 />
                                                                 <input 
                                                                      className='prop-input'
                                                                      type="number"
                                                                      id="width-s"
                                                                      min='0' 
                                                                      max='16'
                                                                      value={actSubUnits[0][2]} 
                                                                      step="1"
                                                                      onChange={(e) =>{
                                                                           if (e.target.value === '') {
                                                                                e.target.value = 0
                                                                           }
                                                                           let lg = actSubUnits[0][0];
                                                                           let med = actSubUnits[0][1];
                                                                           let sm = parseFloat(e.target.value) + 0.1;
                                                                           let tot;
                                                                           let rDimTemp;
                                                                           if(scale === 'metric'){
                                                                                tot = lg + (med/100) + (sm/1000);
                                                                                rDimTemp=[tot/3, actUnits[1]/3,actUnits[2]/3]
                                                                           }else if(scale === 'imperial'){
                                                                                let ret_sm = sm/(12*16);
                                                                                tot = lg + (med/12) + (ret_sm);
                                                                                rDimTemp=[tot/10, actUnits[1]/10,actUnits[2]/10]
                                                                           }
                                                                           setDimTemp(rDimTemp, unique);
                                                                      }}
                                                                 />
                                                            </div>
                                                            <div className='prop-names'>
                                                                 <div className='prop-sub'>
                                                                      {scale==='metric'?'m':'ft'}
                                                                 </div>
                                                                 <div className='prop-sub border-l-r'>
                                                                      {scale==='metric'?'cm':'in'}
                                                                 </div>
                                                                 <div className='prop-sub'>
                                                                      {scale==='metric'?'mm':
                                                                      <div className='in-fract'>
                                                                           <sup>x</sup>/<sub>16</sub>
                                                                      </div>}
                                                                 </div>
                                                            </div>
                                                       </div>
                                                       <div className='prop'>
                                                            <label className='prop-n'>Length</label>
                                                            <div className='prop-fields'>
                                                                 <input 
                                                                      className='prop-input'
                                                                      id="length-l"
                                                                      type="number"
                                                                      min='0' 
                                                                      value={actSubUnits[2][0]}
                                                                      step="1"
                                                                      onChange={(e) =>{
                                                                           if (e.target.value === '') {
                                                                                e.target.value = 0
                                                                           }
                                                                           let lg = parseInt(e.target.value);
                                                                           let med = actSubUnits[2][1]
                                                                           let sm = actSubUnits[2][2] + 0.1;
                                                                           let tot;
                                                                           let rDimTemp;
                                                                           if(scale === 'metric'){
                                                                                tot = lg + (med/100) + (sm/1000);
                                                                                rDimTemp=[actUnits[0]/3, actUnits[1]/3, tot/3];
                                                                           }else if(scale === 'imperial'){
                                                                                let ret_sm = sm/(12*16);
                                                                                tot = lg + (med/12) + (ret_sm);
                                                                                rDimTemp=[actUnits[0]/10, actUnits[1]/10, tot/10];
                                                                           }
                                                                           setDimTemp(rDimTemp, unique);
                                                                      }}
                                                                 />
                                                                 <input 
                                                                      className='prop-input'
                                                                      id="length-m"
                                                                      type="number"
                                                                      min='0' 
                                                                      max='100'
                                                                      value={actSubUnits[2][1]}
                                                                      step="1"
                                                                      onChange={(e) =>{
                                                                           if (e.target.value === '') {
                                                                                e.target.value = 0
                                                                           }
                                                                           let lg = actSubUnits[2][0];
                                                                           let med = parseInt(e.target.value);
                                                                           let sm = actSubUnits[2][2] + 0.1;
                                                                           let tot;
                                                                           let rDimTemp;
                                                                           if(scale === 'metric'){
                                                                                tot = lg + (med/100) + (sm/1000);
                                                                                rDimTemp=[actUnits[0]/3, actUnits[1]/3, tot/3];
                                                                           }else if(scale === 'imperial'){
                                                                                let ret_sm = sm/(12*16);
                                                                                tot = lg + (med/12) + (ret_sm);
                                                                                rDimTemp=[actUnits[0]/10, actUnits[1]/10, tot/10];
                                                                           }
                                                                           setDimTemp(rDimTemp, unique);
                                                                      }}
                                                                 />
                                                                 <input 
                                                                      className='prop-input'
                                                                      type="number"
                                                                      id="length-s"
                                                                      min='0' 
                                                                      max='16'
                                                                      value={actSubUnits[2][2]} 
                                                                      step="1"
                                                                      onChange={(e) =>{
                                                                           if (e.target.value === '') {
                                                                                e.target.value = 0
                                                                           }
                                                                           let lg = actSubUnits[2][0];
                                                                           let med = actSubUnits[2][1];
                                                                           let sm = parseFloat(e.target.value) + 0.1;
                                                                           let tot;
                                                                           let rDimTemp;
                                                                           if(scale === 'metric'){
                                                                                tot = lg + (med/100) + (sm/1000);
                                                                                rDimTemp=[actUnits[0]/3, actUnits[1]/3, tot/3];
                                                                           }else if(scale === 'imperial'){
                                                                                let ret_sm = sm/(12*16);
                                                                                tot = lg + (med/12) + (ret_sm);
                                                                                rDimTemp=[actUnits[0]/10, actUnits[1]/10, tot/10];
                                                                           }
                                                                           setDimTemp(rDimTemp, unique);
                                                                      }}
                                                                 />
                                                            </div>
                                                            <div className='prop-names'>
                                                                 <div className='prop-sub'>
                                                                      {scale==='metric'?'m':'ft'}
                                                                 </div>
                                                                 <div className='prop-sub border-l-r'>
                                                                      {scale==='metric'?'cm':'in'}
                                                                 </div>
                                                                 <div className='prop-sub'>
                                                                      {scale==='metric'?'mm':
                                                                      <div className='in-fract'>
                                                                           <sup>x</sup>/<sub>16</sub>
                                                                      </div>}
                                                                 </div>
                                                            </div>
                                                       </div> 
                                                       <div className='prop'>
                                                            <label className='prop-n'>Rotation</label>
                                                            <div className='prop-fields' style={{'grid-template-columns': '1fr'}}>
                                                                 <input 
                                                                      className='prop-input'
                                                                      type="number" 
                                                                      min='-360' 
                                                                      max='360'
                                                                      value={rotationY} 
                                                                      // defaultValue={rotationY}
                                                                      id="rotation"
                                                                      step="5"
                                                                      onChange={(e) =>{
                                                                           if (e.target.value === '') {
                                                                                e.target.value = 0
                                                                           }
                                                                           let rDeg = e.target.value;
                                                                           // console.log(rVal);
                                                                           setRotation(rDeg, unique);
                                                                      }}
                                                                 />
                                                            </div>
                                                            <div className='prop-names' style={{'grid-template-columns': '1fr'}}>Degrees</div>
                                                       </div>
                                                  </div>
                                             </div>
                                        )
                                   }else {
                                        return(
                                             <div className='attr-n'
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       setPropMenu(true);
                                                  }}
                                             >Room Properties</div>
                                        )
                                   }
                              }) () }
                         </div>
                    </div>
                    <div className='attr-footer'>
                         <div 
                              className='attr-n obj-remove'
                              onClick={() => {
                                   removeObj(unique);
                                   setAttrMenu('');
                                   // setActive('');
                              }}
                         ><i className="fas fa-trash-alt"></i></div>
                    </div>
               </div>
          )
     }else{
          return null
     }
}

// Buggy input-type:color implementation
//<div className='attr-li'>
// <label className='attr-n' htmlFor='color-input'> Color </label>
// <input 
//           className='attr-t'
//           id='color-input'
//           type={'color'} 
//           // value={colorAttr} 
//           value={objInstance.color} 
//           onChange={(e) =>{
//                colorAttr = e.target.value;
//                ref.current.material.color.set(colorAttr);
//           }}
//           // onChange={function(e){
//           //      colorAttr = e.target.value;
//           //      ref.current.material.color.set(colorAttr);
//           // }}
//      />
// </div>
// <div className='attr-li'
//      onClick={(e) =>{
//           e.stopPropagation();
//           changeColor(colorAttr, unique);
//           console.log('current color is: ' + objInstance.color);
//      }}
// >Submit
// </div>
// <div className='attr-li'
//      onClick={(e) =>{
//           e.stopPropagation();
//           // changeColor(colorAttr, unique);
//           ref.current.material.color.set(objInstance.color);
//           console.log('current color is: ' + objInstance.color);
//      }}
// >Cancel
// </div>