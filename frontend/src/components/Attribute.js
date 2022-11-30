import { useStore } from '../hooks/objStore';

// Find a way to choose layout among:
     // Objects Menu
     // Models Menu
     // Room Menu

export const Attribute = () =>{
     const [ objects, conversion, scale,
          changeColor, 
          changeTexture, 
          setActive, 
          removeObj, 
          setTextureMenu, 
          setTextureOptions, 
          setMatType,
          setDimTemp,
     ] = useStore((state) => [ state.objects, state.conv, state.scale,
          state.changeColor,
          state.changeTexture,
          state.setActive,
          state.removeObj,
          state.setTextureMenu,
          state.setTextureOptions,
          state.setMatType,
          state.setDimTemp,
     ]);

     let objInstance = objects.find(o => o.active === 'grid');
     let dimensions;
     let actUnits;

     if(objInstance){
          let unique = objInstance.key;
          dimensions = [
               objInstance.dimTemp[0]*conversion,
               objInstance.dimTemp[1]*conversion,
               objInstance.dimTemp[2]*conversion
          ];
          if(scale === 'metric'){
               actUnits = [dimensions[0]/4,dimensions[1]/4,dimensions[2]/4];
          }
          else if (scale === 'imperial'){
               actUnits = [dimensions[0],dimensions[1],dimensions[2]];
          }

          // Texture Attribute Management
          let colorAttr = objInstance.color;
          let textureAttr = objInstance.texture;
          let colorMenu = objInstance.textureMenu;
          let textureOptions = objInstance.textureOptions;
          let matType = objInstance.matType;

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
                         <div 
                              className={`attr-li ${textureOptions || colorMenu ? 'active' : ''}`}
                              // style={{'grid-template-columns': '1fr'}}
                         >
                              {(() =>{ 
                                   if(textureOptions){
                                        return(
                                             <div className='types-li'>
                                                  <div className='type-row'
                                                       onClick={(e) =>{
                                                            e.stopPropagation();
                                                            setTextureMenu(unique);
                                                            setTextureOptions('');
                                                            setMatType('Plain',unique);
                                                            console.log('Options active: ' + textureOptions);
                                                            console.log('Menu active: ' + colorMenu);
                                                            console.log('Mat Type active: ' + matType);
                                                       }}
                                                  >Plain</div>
                                                  <div className='type-row'
                                                       onClick={(e) =>{
                                                            e.stopPropagation();
                                                            setTextureMenu(unique);
                                                            setTextureOptions('');
                                                            setMatType('Wood',unique);
                                                       }}
                                                  >Wood</div>
                                                  <div className='type-row'
                                                       onClick={(e) =>{
                                                            e.stopPropagation();
                                                            setTextureMenu(unique);
                                                            setTextureOptions('');
                                                            setMatType('Stone',unique);
                                                       }}
                                                  >Stone</div>
                                                  <div className='type-row'
                                                       onClick={(e) =>{
                                                            e.stopPropagation();
                                                            setTextureMenu(unique);
                                                            setTextureOptions('');
                                                            setMatType('Glass',unique);
                                                       }}
                                                  >Glass</div>
                                                  <div className='type-row'
                                                       onClick={(e) =>{
                                                            e.stopPropagation();
                                                            setTextureMenu(unique);
                                                            setTextureOptions('');
                                                            setMatType('Metal',unique);
                                                       }}
                                                  >Metal</div>
                                                  <div className='type-row cancel'
                                                       onClick={(e) =>{
                                                            e.stopPropagation();
                                                            setTextureOptions('');
                                                       }}
                                                  >Cancel</div>
                                             </div>
                                        )
                                   } else if(colorMenu){ 
                                        if(matType === 'Plain'){
                                        return(
                                             <div className='color-li'>
                                                  {/* Menu Head */}
                                                  <div className='type-head'> 
                                                       <div className='type-title'>Plain</div> 
                                                       <div className='cancel-row'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': '#404040'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#808080';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
                                                            }}
                                                       ></div>
                                                  </div>

                                                  {/* Orange Row */}
                                                  <div className='color-row orange'>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': 'orange'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'orange';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu('');
                                                            }}
                                                       ></div>
                                                  </div>

                                                  {/* Yellow Row */}
                                                  <div className='color-row yellow'>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': 'yellow'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'yellow';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu('');
                                                            }}
                                                       ></div>
                                                  </div>

                                                  {/* Lime Row */}
                                                  <div className='color-row lime'>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': 'lime'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'lime';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
                                                            }}
                                                       ></div>
                                                  </div>

                                                  {/* Cyan Row */}
                                                  <div className='color-row cyan'>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': 'cyan'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'cyan';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu('');
                                                            }}
                                                       ></div>
                                                  </div>

                                                  {/* Blue Row */}
                                                  <div className='color-row blue'>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': 'blue'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'blue';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu('');
                                                            }}
                                                       ></div>
                                                  </div>

                                                  {/* Purple Row */}
                                                  <div className='color-row purple'>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': 'purple'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'purple';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu('');
                                                            }}
                                                       ></div>
                                                  </div>

                                                  {/* Magenta Row */}
                                                  <div className='color-row magenta'>
                                                       <div 
                                                            className='color-t' 
                                                            style={{'background': 'magenta'}}
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'magenta';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('blank', unique);
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
                                                            }}
                                                       >Cancel</div>
                                                  </div>
                                                  {/* Wood Row1 */}
                                                  <div className='texture-row'>
                                                       <div 
                                                            className='texture-wood'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'white';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('wood', unique);
                                                                 setTextureMenu('');
                                                                 console.log('current texture is: ' + textureAttr);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='texture-worn-wood'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'white';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('wornWood', unique);
                                                                 setTextureMenu('');
                                                            }}
                                                       ></div>
                                                  </div>
                                                  {/* Wood Row2 */}
                                                  <div className='texture-row'>
                                                       <div 
                                                            className='texture-plywood'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'white';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('plywood', unique);
                                                                 setTextureMenu('');
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='texture-laminate'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'white';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('laminate', unique);
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
                                                            }}
                                                       >Cancel</div>
                                                  </div>
                                                  {/* Stone Row1 */}
                                                  <div className='texture-row'>
                                                       <div 
                                                            className='texture-concrete'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'white';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('concrete', unique);
                                                                 setTextureMenu('');
                                                                 console.log('current texture is: ' + textureAttr);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='texture-concrete'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'white';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('concrete', unique);
                                                                 setTextureMenu('');
                                                            }}
                                                       ></div>
                                                  </div>
                                                  {/* Stone Row2 */}
                                                  <div className='texture-row'>
                                                       <div 
                                                            className='texture-concrete'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'white';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('concrete', unique);
                                                                 setTextureMenu('');
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='texture-concrete'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'white';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('concrete', unique);
                                                                 setTextureMenu('');
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
                                                                 setTextureMenu('');
                                                            }}
                                                       >Cancel</div>
                                                  </div>
                                                  {/* Glass Row1 */}
                                                  <div className='texture-row'>
                                                       <div 
                                                            className='texture-glass'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = '#add8e6';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('glass', unique);
                                                                 setTextureMenu('');
                                                                 console.log('current texture is: ' + textureAttr);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='texture-black-glass'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'black';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('glass', unique);
                                                                 setTextureMenu('');
                                                            }}
                                                       ></div>
                                                  </div>
                                                  {/* Glass Row2 */}
                                                  <div className='texture-row'>
                                                       <div 
                                                            className='texture-red-glass'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'red';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('glass', unique);
                                                                 setTextureMenu('');
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='texture-orange-glass'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'orange';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('glass', unique);
                                                                 setTextureMenu('');
                                                            }}
                                                       ></div>
                                                  </div>
                                             </div>
                                        )}
                                        if(matType === 'Metal'){
                                        return(
                                             <div className='texture-li'>
                                                  {/* Menu Head */}
                                                  <div className='type-head'> 
                                                       <div className='type-title'>Metal</div> 
                                                       <div className='cancel-row'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 setTextureMenu('');
                                                            }}
                                                       >Cancel</div>
                                                  </div>
                                                  {/* Wood Row1 */}
                                                  <div className='texture-row'>
                                                       <div 
                                                            className='texture-wood'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'white';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('wood', unique);
                                                                 setTextureMenu('');
                                                                 console.log('current texture is: ' + textureAttr);
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='texture-wood'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'white';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('wood', unique);
                                                                 setTextureMenu('');
                                                            }}
                                                       ></div>
                                                  </div>
                                                  {/* Wood Row2 */}
                                                  <div className='texture-row'>
                                                       <div 
                                                            className='texture-wood'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'white';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('wood', unique);
                                                                 setTextureMenu('');
                                                            }}
                                                       ></div>
                                                       <div 
                                                            className='texture-wood'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 colorAttr = 'white';
                                                                 changeColor(colorAttr, unique);
                                                                 changeTexture('wood', unique);
                                                                 setTextureMenu('');
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
                                                  setTextureOptions(unique);
                                                  console.log('Options active: ' + textureOptions);
                                             }}>Texture</div>
                                        )
                                   }
                              }) () }

                         </div>

                         {/* ----Changing Object Properties ...soon---- */}
                         <div 
                              className={`pos-props ${ textureOptions || colorMenu ? 'inactive' : ''}`}
                         >
                              {/* {(() =>{ }) () } */}
                         
                              {/* <div className='props-head'
                                   onClick={(e) =>{
                                        e.stopPropagation();
                                        // setTextureOptions(unique);
                                        // console.log('Options active: ' + textureOptions);
                                   }}
                              >Properties</div> */}
                              <div className='props-row'>
                                   <div className='props-type'>Properties</div>
                                   <div className='props-opts'>
                                        <div className='prop'>
                                             {/* Have a separation of units
                                                  _m _cm or _' _"
                                                  based on the type of scale
                                             */}
                                             <label className='prop-n'>Width: </label>
                                             <input 
                                                  type="number"
                                                  // Min max should be decided based on scale 
                                                  min='0' 
                                                  max='10'
                                                  value={actUnits[0]} 
                                                  id="width"
                                                  // Step should be decided based on scale
                                                  step="1"
                                                  onChange={(e) =>{
                                                       let rVal = e.target.value;
                                                       let rDimTemp;
                                                       if(scale === 'metric'){
                                                            rDimTemp=[rVal/3, actUnits[1]/3,actUnits[2]/3]
                                                       }else if(scale === 'imperial'){
                                                            rDimTemp=[rVal/10, actUnits[1]/10,actUnits[2]/10]
                                                       }
                                                       console.log(rVal);
                                                       setDimTemp(rDimTemp, unique);
                                                  }}
                                             />
                                             {/* <input type="range" min="0" max="10" value="5" class="slider" id="myRange"/> */}
                                        </div>
                                        <div className='prop'>
                                        <label className='prop-n'>Lenth: </label>
                                             <input 
                                                  type="number" 
                                                  // Min max should be decided based on scale
                                                  min='0' 
                                                  max='10'
                                                  value={actUnits[2]} 
                                                  id="length"
                                                  // Step should be decided based on scale
                                                  step="1"
                                                  onChange={(e) =>{
                                                       let rVal = e.target.value;
                                                       let rDimTemp;
                                                       if(scale === 'metric'){
                                                            rDimTemp=[actUnits[0]/3, actUnits[1]/3, rVal/3]
                                                       }else if(scale === 'imperial'){
                                                            rDimTemp=[actUnits[0]/10, actUnits[1]/10, rVal/10]
                                                       }
                                                       console.log(rVal);
                                                       setDimTemp(rDimTemp, unique);
                                                  }}
                                             />
                                        </div> 
                                        <div className='prop'>Rotation: </div> 
                                   </div>
                              </div>
                              <div className='props-row'>
                              <div className='props-n'>Something Else</div>
                                   <div className='props-opts'>
                                        <div className='prop'>idk: </div>
                                   </div>
                              </div>
                         </div>
                         
                    </div>
                    <div className='attr-footer'>
                         <div 
                              className='attr-n obj-remove'
                              onClick={() => {
                                   removeObj(unique);
                                   setActive('');
                              }}
                         >R</div>
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