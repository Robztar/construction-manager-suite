import { useStore } from '../../hooks/objStore';
import { useState } from 'react';
import { FixTureMenu } from './FixtureMenu';

export const WallMenu = () =>{
     const [ 
          objects, conversion, scale, fixtures,
          changeWallColor, 
          changeWallTexture, 
          setActiveWallNo, 
          setWallMenu, 
          setMatType,
          addFixture,
          setDimTemp,
     ] = useStore((state) => [ 
          state.objects, state.conv, state.scale, state.fixtures,
          state.changeWallColor,
          state.changeWallTexture,
          state.setActiveWallNo,
          state.setWallMenu,
          state.setMatType,
          state.addFixture,
          state.setDimTemp,
     ]);
     
     const[wallMain,setWallMain] = useState(true);     //Main Interface
     const[wallSpec,setWallSpec] = useState(false);    //Main Interface
     const[fixMenu,setFixMenu] = useState(false);      //Wall fixtures Interface
     const[fixTypeMenu,setFixTypeMenu] = useState(false);   //Wall fixture type Interface
     const[fixCat,setFixCat] = useState(null);         //Fixture category
     const[addMenu,setAddMenu] = useState(false);      //Wall add fixture Interface
     const[fixEdit,setFixEditMenu] = useState(false);      //Wall fixture editing Interface
     const[activeFix,setActiveFix] = useState('');      //active fixture Id Interface
     const[editMenu,setEdit] = useState(false);        //Wall edit Interface
     const[textureOptions,setOptions] = useState(false);    // Texture Options Menu
     const[textureMenu,setTextureMenu] = useState(false);   // Textures / Colors Menu
     const[propMenu,setPropMenu] = useState(false);    // Properties Menu


     let objInstance = objects.find(o => o.wallMenu === 'grid');
     let dimensions;
     let actUnits;
     let actSubUnits;

     if(objInstance){
          let unique = objInstance.key;
          let activeWallNo = objInstance.activeWallNo;

          // Fixtures Management
          let fixInstance = fixtures.filter(e => e.objId === unique);
          // console.log("Fixture Instance = "+ fixInstance);

          // (Not retrofitted) Dimension Development
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
          }

          // Texture Attribute Management
          let matType = objInstance.matType;
          let wallColor = objInstance.wallColor;
          let wallTexture = objInstance.wallTexture;

          return(
               <div 
                    className='float wall-cont'
                    style={{'display': objInstance.wallMenu}}
               >
                    <div className="wall-head">
                         <h3 className='wall-title'>
                              Wall Menu
                         </h3>
                         <i 
                              className="fas fa-times wall-exit"
                              onClick={()=>{
                                   setWallMenu('');
                                   setActiveWallNo(unique, null);
                                   setWallMain(true);
                                   setWallSpec(false);
                                   setFixMenu(false);
                                   setFixTypeMenu(false);
                                   setAddMenu(false);
                                   setFixEditMenu(false);
                                   setEdit(false);
                                   setOptions(false);
                                   setTextureMenu(false);
                                   setPropMenu(false);
                                   setActiveFix('');
                              }}
                         ></i>
                    </div>
                    {(() =>{ 
                         if(wallMain){
                              return(
                                   <div className='wall-menu'>
                                        <div className='wall-li'>
                                             <div className='wall-n'
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       setWallMain(false);
                                                       setWallSpec(true);
                                                       setActiveWallNo(unique, 0);
                                                  }}
                                             >Wall 1</div>
                                        </div>
                                        <div className='wall-li'>
                                        <div className='wall-n'
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       setWallMain(false);
                                                       setWallSpec(true);
                                                       setActiveWallNo(unique, 1);
                                                  }}
                                             >Wall 2</div>
                                        </div>
                                        <div className='wall-li'>
                                        <div className='wall-n'
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       setWallMain(false);
                                                       setWallSpec(true);
                                                       setActiveWallNo(unique, 2);
                                                  }}
                                             >Wall 3</div>
                                        </div>
                                        <div className='wall-li'>
                                        <div className='wall-n'
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       setWallMain(false);
                                                       setWallSpec(true);
                                                       setActiveWallNo(unique, 3);
                                                  }}
                                             >Wall 4</div>
                                        </div>
                                   </div>
                              )
                         }else if(wallSpec){
                              return(
                                   <div className='wall-menu'>
                                        <div className='wall-li'>
                                             <div className='wall-n'
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       setFixMenu(true);
                                                       setWallSpec(false);
                                                  }}
                                             >Fixtures</div>
                                        </div>
                                        <div className='wall-li'>
                                             <div className='wall-n'
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       setEdit(true);
                                                       setWallSpec(false);
                                                  }}
                                             >Edit</div>
                                        </div>
                                   </div>
                              )
                         }else if(fixMenu){
                              return(
                                   <div className='wall-menu'>
                                        <div className='wall-li'>
                                             <div className='wall-n'
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       setFixMenu(false);
                                                       setFixTypeMenu(true);
                                                       setFixCat('Window');
                                                  }}
                                             >Windows</div>
                                        </div>
                                        <div className='wall-li'>
                                        <div className='wall-n'
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       setFixMenu(false);
                                                       setFixTypeMenu(true);
                                                       setFixCat('Door')
                                                  }}
                                             >Doors</div>
                                        </div>
                                   </div>
                              )
                         }else if(editMenu){
                              return(
                                   <div className='wall-menu'>
                                        {/* Wall Texture */}
                                        <div className={`wall-li 
                                             ${ textureMenu || textureOptions ? 'active' : ''}
                                             ${ propMenu ? 'inactive' : ''}
                                        `}>
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
                                                                 <div className='type-row'
                                                                      onClick={(e) =>{
                                                                           e.stopPropagation();
                                                                           setOptions(false);
                                                                           setTextureMenu(true);
                                                                           setMatType('Metal',unique);
                                                                      }}
                                                                 >Metal</div>
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
                                                                                     wallColor[activeWallNo] = 'white';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#BFBFBF'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#BFBFBF';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#808080'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#808080';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#404040'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#404040';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': 'black'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = 'black';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
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
                                                                                     wallColor[activeWallNo] = '#FFCCCC';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#FF6666'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#FF6666';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': 'red'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = 'red';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#990000'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#990000';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#330000'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#330000';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
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
                                                                                     wallColor[activeWallNo] = 'orange';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
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
                                                                                     wallColor[activeWallNo] = 'yellow';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
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
                                                                                     wallColor[activeWallNo] = 'lime';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
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
                                                                                     wallColor[activeWallNo] = '#CCFFE5';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#66FFB2'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#66FFB2';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#00FF80'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#00FF80';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#00994C'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#00994C';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#003319'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#003319';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
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
                                                                                     wallColor[activeWallNo] = 'cyan';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
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
                                                                                     wallColor[activeWallNo] = 'blue';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
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
                                                                                     wallColor[activeWallNo] = 'purple';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
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
                                                                                     wallColor[activeWallNo] = 'magenta';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
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
                                                                                     wallColor[activeWallNo] = '#FFCCE5';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#FF66B2'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#FF66B2';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#FF007F'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#FF007F';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#99004C'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#99004C';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#330019'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#330019';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
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
                                                                                     wallColor[activeWallNo] = 'white';
                                                                                     wallTexture[activeWallNo] = 'wood';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                     console.log('current texture is: ' + wallTexture[activeWallNo]);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='texture-item t-worn-wood'
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = 'white';
                                                                                     wallTexture[activeWallNo] = 'wornWood';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
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
                                                                                     wallColor[activeWallNo] = 'white';
                                                                                     wallTexture[activeWallNo] = 'plywood';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='texture-item t-laminate'
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = 'white';
                                                                                     wallTexture[activeWallNo] = 'laminate';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
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
                                                                                     wallColor[activeWallNo] = 'white';
                                                                                     wallTexture[activeWallNo] = 'concrete';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                     console.log('current texture is: ' + wallTexture[activeWallNo]);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='texture-item t-concrete'
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = 'white';
                                                                                     wallTexture[activeWallNo] = 'concrete';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                      </div>
                                                                      {/* Stone Row2 */}
                                                                      <div className='texture-row'>
                                                                           <div 
                                                                                className='texture-item t-concrete'
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = 'white';
                                                                                     wallTexture[activeWallNo] = 'concrete';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='texture-item t-concrete'
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = 'white';
                                                                                     wallTexture[activeWallNo] = 'concrete';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
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
                                                                                     wallColor[activeWallNo] = '#add8e6';
                                                                                     wallTexture[activeWallNo] = 'glass';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                     console.log('current texture is: ' + wallTexture[activeWallNo]);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='t-glass'
                                                                                style={{'background': 'black'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = 'black';
                                                                                     wallTexture[activeWallNo] = 'glass';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
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
                                                                                     wallColor[activeWallNo] = 'red';
                                                                                     wallTexture[activeWallNo] = 'glass';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='t-glass'
                                                                                style={{'background': 'orange'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = 'orange';
                                                                                     wallTexture[activeWallNo] = 'glass';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
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
                                                                                     wallColor[activeWallNo] = 'white';
                                                                                     wallTexture[activeWallNo] = 'wood';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                     console.log('current texture is: ' + wallTexture[activeWallNo]);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='texture-item t-wood'
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = 'white';
                                                                                     wallTexture[activeWallNo] = 'wood';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                      </div>
                                                                      {/* Wood Row2 */}
                                                                      <div className='texture-row'>
                                                                           <div 
                                                                                className='texture-item t-wood'
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = 'white';
                                                                                     wallTexture[activeWallNo] = 'wood';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='texture-item t-wood'
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = 'white';
                                                                                     wallTexture[activeWallNo] = 'wood';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                      </div>
                                                                 </div>
                                                            )}
                                                  } else {
                                                       return(
                                                            <div className='wall-n'
                                                                 onClick={(e) =>{
                                                                      e.stopPropagation();
                                                                      // setEditHome(false);
                                                                      setOptions(true);
                                                                 }}
                                                            >Wall Texture</div>
                                                       )
                                                  }
                                             }) () }
                                        </div>
                                        <div className={`wall-li 
                                             ${ textureMenu || textureOptions ? 'inactive' : ''}
                                             ${ propMenu ? 'active' : ''}
                                        `}>
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
                                                                      {/* >Done</div> */}
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
                                                                                          // console.log(rVal);
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
                                                                                     min='0' 
                                                                                     max='360'
                                                                                     // value={0} 
                                                                                     defaultValue={0}
                                                                                     id="rotation"
                                                                                     step="10"
                                                                                     onChange={(e) =>{
                                                                                          let rVal = e.target.value;
                                                                                          console.log(rVal);
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
                                                            >Wall Properties</div>
                                                       )
                                                  }
                                             }) () }
                                        </div>
                                   </div>
                              )
                         }else if(fixTypeMenu){
                              return(
                                   <div className='wall-menu'>
                                        <div className='wall-li active'>
                                             <div className='fix-li'>
                                                  <div className='fix-head'>
                                                       <div className='fix-type'>{fixCat}</div>
                                                       <div className='fix-done'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 setFixMenu(true);
                                                                 setFixTypeMenu(false);
                                                                 // setFixCat(null);
                                                            }}
                                                       ><i className="fas fa-times-circle"></i></div>
                                                  </div>
                                                  
                                                  <div className='fix-opts'>
                                                       <div className='add-fixture'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 setAddMenu(true);
                                                                 setFixTypeMenu(false);
                                                            }}
                                                       >
                                                            <label className='fix-n'>{fixCat}</label>
                                                            <i className="fas fa-plus-circle"></i>
                                                       </div>
                                                       {fixInstance.map(({key, wallNum, type}) =>{
                                                            if(type[0] === fixCat && wallNum === activeWallNo){
                                                                 return(
                                                                      <div 
                                                                           className='fixture'
                                                                           key={key}
                                                                           fixid={key}
                                                                           onClick={()=>{
                                                                                setFixTypeMenu(false);
                                                                                setActiveFix(key);
                                                                                setFixEditMenu(true);
                                                                           }}
                                                                      >
                                                                           <label className='fix-n'>{type[1]} {type[0]}</label>
                                                                      </div>
                                                                 )
                                                            }
                                                            return null;
                                                       })}
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              )
                         }else if(addMenu){
                              return(
                                   <div className='wall-menu'>
                                        <div className='wall-li active'>
                                             <div className='fix-li'>
                                                  <div className='fix-head'>
                                                       <div className='fix-type'>Add {fixCat}</div>
                                                       <div className='fix-done'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 setFixTypeMenu(true);
                                                                 setAddMenu(false);
                                                            }}
                                                       ><i className="fas fa-times-circle"></i></div>
                                                  </div>
                                                  
                                                  <div className='fix-opts'>
                                                       <div className='add-fixture'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 let model;
                                                                 let dimensions;
                                                                 let defColor;
                                                                 let defTexture;
                                                                 if(fixCat === 'Door'){
                                                                      model = 'Exterior';
                                                                      dimensions = [0.068,0.667,0.3];
                                                                      defColor = 'white';
                                                                      defTexture = 'wood';
                                                                 }else{
                                                                      model = 'Standard';
                                                                      dimensions = [0.068,0.4,0.3];
                                                                      defColor = '#add8e6';
                                                                      defTexture = 'glass';
                                                                 }
                                                                 addFixture(
                                                                      activeWallNo, [fixCat, model], 
                                                                      unique, dimensions,
                                                                      defColor, defTexture
                                                                 );
                                                                 setFixTypeMenu(true);
                                                                 setAddMenu(false);
                                                            }}
                                                       >
                                                            <i className="fas fa-plus-circle"></i>
                                                            <label className='fix-n'>
                                                                 {fixCat === 'Door'? 'Exterior ':'Standard '}
                                                                 {/* {(() =>{ }) () } */}
                                                                 {fixCat}
                                                            </label>
                                                       </div>
                                                       <div className='add-fixture'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 let model;
                                                                 let dimensions;
                                                                 let defColor;
                                                                 let defTexture;
                                                                 if(fixCat === 'Door'){
                                                                      model = 'Interior';
                                                                      dimensions = [0.068,0.667,0.3];
                                                                      defColor = 'white';
                                                                      defTexture = 'wood';
                                                                 }else{
                                                                      model = 'Tall';
                                                                      dimensions = [0.068,0.5,0.2];
                                                                      defColor = '#add8e6';
                                                                      defTexture = 'glass';
                                                                 }
                                                                 addFixture(
                                                                      activeWallNo, [fixCat, model], 
                                                                      unique, dimensions,
                                                                      defColor, defTexture
                                                                 );
                                                                 setFixTypeMenu(true);
                                                                 setAddMenu(false);
                                                            }}
                                                       >
                                                            <i className="fas fa-plus-circle"></i>
                                                            <label className='fix-n'>
                                                                 {fixCat === 'Door'? 'Interior ':'Tall '}
                                                                 {/* {(() =>{ }) () } */}
                                                                 {fixCat}
                                                            </label>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              )
                         }else if(fixEdit){
                              return(
                                   <div className='wall-menu'>
                                        <div className='wall-li active'>
                                             <FixTureMenu
                                                  fixId={activeFix}
                                                  setActiveFix={setActiveFix}
                                                  setFixEditMenu={setFixEditMenu}
                                                  setFixTypeMenu={setFixTypeMenu}
                                                  objInstance={objInstance}
                                                  wallNo={activeWallNo}
                                             />
                                        </div>
                                   </div>
                              )
                         }
                    }) () }

                    {/* Footer */}
                    {(() =>{ 
                         if(wallMain){
                              return(
                                   <div className='wall-footer'>
                                        {/* <div 
                                             className='wall-n'
                                             onClick={() => {
                                                  // removeObj(unique);
                                                  // setAttrMenu('');
                                                  // setActive('');
                                             }}
                                        ><i className="fas fa-trash-alt"></i></div> */}
                                   </div>
                              )
                         }else{
                              return(
                                   <div className='wall-footer'>
                                        <div 
                                             className='wall-foot go-back'
                                             onClick={() => {
                                                  if(wallSpec){
                                                       setWallMain(true);
                                                       setWallSpec(false);
                                                       setActiveWallNo(unique, null);
                                                  }else if(fixMenu){
                                                       setWallSpec(true);
                                                       setFixMenu(false);
                                                  }else if(editMenu){
                                                       setWallSpec(true);
                                                       setEdit(false);
                                                       setOptions(false);
                                                       setTextureMenu(false);
                                                       setPropMenu(false);
                                                  }else if(fixTypeMenu){
                                                       setFixMenu(true);
                                                       setFixTypeMenu(false);
                                                  }else if(addMenu){
                                                       setFixTypeMenu(true);
                                                       setAddMenu(false);
                                                  }else if(fixEdit){
                                                       setFixTypeMenu(true);
                                                       setFixEditMenu(false);
                                                       setActiveFix('');
                                                  }
                                                  
                                             }}
                                        ><i className="fas fa-arrow-left"></i></div>
                                        <div className='wall-foot'>Wall {activeWallNo + 1}</div>
                                        <div 
                                             className='wall-foot go-wall-main'
                                             onClick={() => {
                                                  setWallMain(true);
                                                  setWallSpec(false);
                                                  setActiveWallNo(unique, null);
                                                  setFixMenu(false);
                                                  setEdit(false);
                                                  setOptions(false);
                                                  setTextureMenu(false);
                                                  setPropMenu(false);
                                                  setFixTypeMenu(false);
                                                  setAddMenu(false);
                                                  setFixEditMenu(false);
                                                  setActiveFix('');
                                             }}
                                        ><i className="fas fa-home"></i></div>

                                   </div>
                              )
                         }
                    }) () }
                    {/* {(() =>{ }) () } */}
               </div>
          )
     }else{
          return null
     }
}