import { useStore } from '../../hooks/objStore';
import { useState } from 'react';
import { FixTureMenu } from './FixtureMenu';

export const WallMenu = () =>{
     const [ 
          objects, projects, fixtures,
          changeWallColor, 
          changeWallTexture, 
          setActiveWallNo, 
          setWallMenu, 
          setMatType,
          addFixture,
          setWallDimTempX,
          setWallDimTempY,
     ] = useStore((state) => [ 
          state.objects, state.projects, state.fixtures,
          state.changeWallColor,
          state.changeWallTexture,
          state.setActiveWallNo,
          state.setWallMenu,
          state.setMatType,
          state.addFixture,
          state.setWallDimTempX,
          state.setWallDimTempY,
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
     
     let wallDimX;
     let wallDimY;
     let actWallX;
     let actWallY;
     let actWallXSubU;
     let actWallYSubU;

     if(objInstance){
          let unique = objInstance.key;
          let projInstance = projects.find(p => p.key === objInstance.projId);
          let scale = projInstance.scale;
          let conversion = projInstance.conversion;
          let activeWallNo = objInstance.activeWallNo;

          // Fixtures Management
          let fixInstance = fixtures.filter(e => e.objId === unique);
          // console.log("Fixture Instance = "+ fixInstance);

          // Wall Dimension Development
          wallDimX = [
               objInstance.wallDimTempX[0]*conversion,
               objInstance.wallDimTempX[1]*conversion,
               objInstance.wallDimTempX[2]*conversion,
               objInstance.wallDimTempX[3]*conversion
          ];
          wallDimY = [
               objInstance.wallDimTempY[0]*conversion,
               objInstance.wallDimTempY[1]*conversion,
               objInstance.wallDimTempY[2]*conversion,
               objInstance.wallDimTempY[3]*conversion
          ];
          if(scale === 'metric'){
               actWallX = [wallDimX[0]/4,wallDimX[1]/4,wallDimX[2]/4,wallDimX[3]/4];
               actWallY = [wallDimY[0]/4,wallDimY[1]/4,wallDimY[2]/4,wallDimY[3]/4];
               actWallXSubU = [
                    [
                         Math.floor(actWallX[0]), //metre
                         Math.floor((actWallX[0] % 1) * 100),   //cm
                         Math.floor((((actWallX[0] % 1) * 100) % 1) * 10)  //mm
                    ],
                    [
                         Math.floor(actWallX[1]), //metre
                         Math.floor((actWallX[1] % 1) * 100),   //cm
                         Math.floor((((actWallX[1] % 1) * 100) % 1) * 10)  //mm
                    ],
                    [
                         Math.floor(actWallX[2]), //metre
                         Math.floor((actWallX[2] % 1) * 100),   //cm
                         Math.floor((((actWallX[2] % 1) * 100) % 1) * 10)  //mm
                    ],
                    [
                         Math.floor(actWallX[3]), //metre
                         Math.floor((actWallX[3] % 1) * 100),   //cm
                         Math.floor((((actWallX[3] % 1) * 100) % 1) * 10)  //mm
                    ],
               ];
               actWallYSubU = [
                    [
                         Math.floor(actWallY[0]), //metre
                         Math.floor((actWallY[0] % 1) * 100),   //cm
                         Math.floor((((actWallY[0] % 1) * 100) % 1) * 10)  //mm
                    ],
                    [
                         Math.floor(actWallY[1]), //metre
                         Math.floor((actWallY[1] % 1) * 100),   //cm
                         Math.floor((((actWallY[1] % 1) * 100) % 1) * 10)  //mm
                    ],
                    [
                         Math.floor(actWallY[2]), //metre
                         Math.floor((actWallY[2] % 1) * 100),   //cm
                         Math.floor((((actWallY[2] % 1) * 100) % 1) * 10)  //mm
                    ],
                    [
                         Math.floor(actWallY[3]), //metre
                         Math.floor((actWallY[3] % 1) * 100),   //cm
                         Math.floor((((actWallY[3] % 1) * 100) % 1) * 10)  //mm
                    ],
               ];
               // console.log("Width is "+ actSubUnits[0][0]+"m, "+actSubUnits[0][1]+"cm, "+actSubUnits[0][2]+"mm.");
          }else if (scale === 'imperial'){
               actWallX = [wallDimX[0],wallDimX[1],wallDimX[2],wallDimX[3]];
               actWallY = [wallDimY[0],wallDimY[1],wallDimY[2],wallDimY[3]];
               actWallXSubU = [
                    [
                         Math.floor(actWallX[0]), //foot
                         Math.floor((actWallX[0] % 1) * 12),   //in
                         Math.floor((((actWallX[0] % 1) * 12) % 1) * 16)  //fract
                    ],
                    [
                         Math.floor(actWallX[1]), //foot
                         Math.floor((actWallX[1] % 1) * 12),   //in
                         Math.floor((((actWallX[1] % 1) * 12) % 1) * 16)   //fract
                    ],
                    [
                         Math.floor(actWallX[2]), //foot
                         Math.floor((actWallX[2] % 1) * 12),   //in
                         Math.floor((((actWallX[2] % 1) * 12) % 1) * 16)  //fract
                    ],
                    [
                         Math.floor(actWallX[3]), //foot
                         Math.floor((actWallX[3] % 1) * 12),   //in
                         Math.floor((((actWallX[3] % 1) * 12) % 1) * 16)  //fract
                    ],
               ];
               actWallYSubU = [
                    [
                         Math.floor(actWallY[0]), //foot
                         Math.floor((actWallY[0] % 1) * 12),   //in
                         Math.floor((((actWallY[0] % 1) * 12) % 1) * 16)  //fract
                    ],
                    [
                         Math.floor(actWallY[1]), //foot
                         Math.floor((actWallY[1] % 1) * 12),   //in
                         Math.floor((((actWallY[1] % 1) * 12) % 1) * 16)   //fract
                    ],
                    [
                         Math.floor(actWallY[2]), //foot
                         Math.floor((actWallY[2] % 1) * 12),   //in
                         Math.floor((((actWallY[2] % 1) * 12) % 1) * 16)  //fract
                    ],
                    [
                         Math.floor(actWallY[3]), //foot
                         Math.floor((actWallY[3] % 1) * 12),   //in
                         Math.floor((((actWallY[3] % 1) * 12) % 1) * 16)  //fract
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
                                        <div 
                                             className={`wall-toggle 
                                                       ${ wallDimX[activeWallNo]>0 && wallDimY[activeWallNo]>0 
                                                            ? 'wall-del' : 'wall-add'}
                                                  `}
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       let rWallXTemp = [
                                                            objInstance.wallDimTempX[0],
                                                            objInstance.wallDimTempX[1],
                                                            objInstance.wallDimTempX[2],
                                                            objInstance.wallDimTempX[3]
                                                       ];
                                                       let rWallYTemp = [
                                                            objInstance.wallDimTempY[0],
                                                            objInstance.wallDimTempY[1],
                                                            objInstance.wallDimTempY[2],
                                                            objInstance.wallDimTempY[3]
                                                       ];
                                                       console.log("Wall X: "+rWallXTemp+" Before");
                                                       if(rWallXTemp[activeWallNo]>0 && rWallYTemp[activeWallNo]>0){
                                                            rWallXTemp[activeWallNo] = 0;
                                                            rWallYTemp[activeWallNo] = 0;
                                                            console.log("Delete Wall X: "+rWallXTemp);
                                                       }else{
                                                            rWallXTemp[activeWallNo] = 0.068;
                                                            rWallYTemp[activeWallNo] = 1;
                                                            console.log("Add Wall X: "+rWallXTemp);
                                                       }
                                                       // console.log("Wall X: "+rWallXTemp+" After");
                                                       setWallDimTempX(rWallXTemp, unique);
                                                       setWallDimTempY(rWallYTemp, unique);
                                                  }}
                                             >{wallDimX[activeWallNo]>0 && wallDimY[activeWallNo]>0 
                                                  ? 'Delete Wall' : 'Add Wall'
                                             }
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
                                                                                style={{'background': '#FFE5CC'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#FFE5CC';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#FFB266'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#FFB266';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
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
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#994C00'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#994C00';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#331900'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#331900';
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
                                                                                style={{'background': '#FFFFCC'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#FFFFCC';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#FFFF66'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#FFFF66';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
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
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#999900'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#999900';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#333300'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#333300';
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
                                                                                style={{'background': '#CCFFCC'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#CCFFCC';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#66FF66'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#66FF66';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
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
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#009900'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#009900';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#003300'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#003300';
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
                                                                                style={{'background': '#CCFFFF'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#CCFFFF';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#66FFFF'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#66FFFF';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
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
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#009999'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#009999';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#003333'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#003333';
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
                                                                                style={{'background': '#CCCCFF'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#CCCCFF';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#6666FF'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#6666FF';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
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
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#000099'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#000099';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#000033'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#000033';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
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
                                                                                     wallColor[activeWallNo] = '#FFCCFF';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#FF66FF'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#FF66FF';
                                                                                     wallTexture[activeWallNo] = 'blank';
                                                                                     changeWallColor(wallColor, unique);
                                                                                     changeWallTexture(wallTexture, unique);
                                                                                     setTextureMenu(false);
                                                                                }}
                                                                           ></div>
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
                                                                           <div 
                                                                                className='color-t' 
                                                                                style={{'background': '#330033'}}
                                                                                onClick={(e) =>{
                                                                                     e.stopPropagation();
                                                                                     wallColor[activeWallNo] = '#330033';
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
                                                                           <label className='prop-n'>Wall Height</label>
                                                                           <div className='prop-fields'>
                                                                                <input 
                                                                                     className='prop-input'
                                                                                     id="heightW-l"
                                                                                     type="number"
                                                                                     min='0' 
                                                                                     value={actWallYSubU[activeWallNo][0]}
                                                                                     step="1"
                                                                                     onChange={(e) =>{
                                                                                          if (e.target.value === '') {
                                                                                               e.target.value = 0
                                                                                          }
                                                                                          let lg = parseInt(e.target.value);
                                                                                          let med = actWallYSubU[activeWallNo][1]
                                                                                          let sm = actWallYSubU[activeWallNo][2] + 0.1;
                                                                                          let tot;
                                                                                          let rWallYTemp;
                                                                                          if(scale === 'metric'){
                                                                                               tot = lg + (med/100) + (sm/1000);
                                                                                               // console.log("Width is "+lg+"m, "+med+"cm, "+sm+"mm.");
                                                                                               // console.log("Total Width is " + tot);
                                                                                               rWallYTemp=[tot/3, tot/3, tot/3, tot/3];
                                                                                          }else if(scale === 'imperial'){
                                                                                               let ret_sm = sm/(12*16);
                                                                                               tot = lg + (med/12) + (ret_sm);
                                                                                               // console.log("Width is "+lg+"ft, "+med+" and "+sm+"/16 in.");
                                                                                               // console.log("Total Width is " + tot);
                                                                                               rWallYTemp=[tot/10, tot/10, tot/10, tot/10];
                                                                                          }
                                                                                          setWallDimTempY(rWallYTemp, unique);
                                                                                     }}
                                                                                />
                                                                                <input 
                                                                                     className='prop-input'
                                                                                     id="heightW-m"
                                                                                     type="number"
                                                                                     min='0' 
                                                                                     max='100'
                                                                                     value={actWallYSubU[activeWallNo][1]}
                                                                                     step="1"
                                                                                     onChange={(e) =>{
                                                                                          if (e.target.value === '') {
                                                                                               e.target.value = 0
                                                                                          }
                                                                                          let lg = actWallYSubU[activeWallNo][0];
                                                                                          let med = parseInt(e.target.value);
                                                                                          let sm = actWallYSubU[activeWallNo][2] + 0.1;
                                                                                          let tot;
                                                                                          let rWallYTemp;
                                                                                          if(scale === 'metric'){
                                                                                               tot = lg + (med/100) + (sm/1000);
                                                                                               rWallYTemp=[tot/3, tot/3, tot/3, tot/3];
                                                                                          }else if(scale === 'imperial'){
                                                                                               let ret_sm = sm/(12*16);
                                                                                               tot = lg + (med/12) + (ret_sm);
                                                                                               rWallYTemp=[tot/10, tot/10, tot/10, tot/10];
                                                                                          }
                                                                                          setWallDimTempY(rWallYTemp, unique);
                                                                                     }}
                                                                                />
                                                                                <input 
                                                                                     className='prop-input'
                                                                                     type="number"
                                                                                     id="heightW-s"
                                                                                     min='0' 
                                                                                     max='16'
                                                                                     value={actWallYSubU[activeWallNo][2]} 
                                                                                     step="1"
                                                                                     onChange={(e) =>{
                                                                                          if (e.target.value === '') {
                                                                                               e.target.value = 0
                                                                                          }
                                                                                          let lg = actWallYSubU[activeWallNo][0];
                                                                                          let med = actWallYSubU[activeWallNo][1];
                                                                                          let sm = parseFloat(e.target.value) + 0.1;
                                                                                          let tot;
                                                                                          let rWallYTemp;
                                                                                          if(scale === 'metric'){
                                                                                               tot = lg + (med/100) + (sm/1000);
                                                                                               rWallYTemp=[tot/3, tot/3, tot/3, tot/3];
                                                                                          }else if(scale === 'imperial'){
                                                                                               let ret_sm = sm/(12*16);
                                                                                               tot = lg + (med/12) + (ret_sm);
                                                                                               rWallYTemp=[tot/10, tot/10, tot/10, tot/10];
                                                                                          }
                                                                                          setWallDimTempY(rWallYTemp, unique);
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
                                                                           <label className='prop-n'>Wall Thickness</label>
                                                                           <div className='prop-fields'>
                                                                                <input 
                                                                                     className='prop-input'
                                                                                     id="thick-l"
                                                                                     type="number"
                                                                                     min='0'
                                                                                     max={scale === "metric"? 1 : 3} 
                                                                                     value={actWallXSubU[activeWallNo][0]}
                                                                                     step="1"
                                                                                     onChange={(e) =>{
                                                                                          if (e.target.value === '') {
                                                                                               e.target.value = 0
                                                                                          }
                                                                                          let lg = parseInt(e.target.value);
                                                                                          let med = actWallXSubU[activeWallNo][1]
                                                                                          let sm = actWallXSubU[activeWallNo][2] + 0.1;
                                                                                          let tot;
                                                                                          let rWallXTemp;
                                                                                          if(scale === 'metric'){
                                                                                               tot = lg + (med/100) + (sm/1000);
                                                                                               rWallXTemp=[actWallX[0]/3, actWallX[1]/3, actWallX[2]/3, actWallX[3]/3];
                                                                                               rWallXTemp[activeWallNo] = tot/3;
                                                                                          }else if(scale === 'imperial'){
                                                                                               let ret_sm = sm/(12*16);
                                                                                               tot = lg + (med/12) + (ret_sm);
                                                                                               rWallXTemp=[actWallX[0]/10, actWallX[1]/10, actWallX[2]/10, actWallX[3]/10];
                                                                                               rWallXTemp[activeWallNo] = tot/10;
                                                                                          }
                                                                                          setWallDimTempX(rWallXTemp, unique);
                                                                                     }}
                                                                                />
                                                                                <input 
                                                                                     className='prop-input'
                                                                                     id="thick-m"
                                                                                     type="number"
                                                                                     min='0'
                                                                                     max='100'
                                                                                     value={actWallXSubU[activeWallNo][1]}
                                                                                     step="1"
                                                                                     onChange={(e) =>{
                                                                                          if (e.target.value === '') {
                                                                                               e.target.value = 0
                                                                                          }
                                                                                          let lg = actWallXSubU[activeWallNo][0];
                                                                                          let med = parseInt(e.target.value);
                                                                                          let sm = actWallXSubU[activeWallNo][2] + 0.1;
                                                                                          let tot;
                                                                                          let rWallXTemp;
                                                                                          if(scale === 'metric'){
                                                                                               tot = lg + (med/100) + (sm/1000);
                                                                                               rWallXTemp=[actWallX[0]/3, actWallX[1]/3, actWallX[2]/3, actWallX[3]/3];
                                                                                               rWallXTemp[activeWallNo] = tot/3;
                                                                                          }else if(scale === 'imperial'){
                                                                                               let ret_sm = sm/(12*16);
                                                                                               tot = lg + (med/12) + (ret_sm);
                                                                                               rWallXTemp=[actWallX[0]/10, actWallX[1]/10, actWallX[2]/10, actWallX[3]/10];
                                                                                               rWallXTemp[activeWallNo] = tot/10;
                                                                                          }
                                                                                          setWallDimTempX(rWallXTemp, unique);
                                                                                     }}
                                                                                />
                                                                                <input 
                                                                                     className='prop-input'
                                                                                     type="number"
                                                                                     id="length-s"
                                                                                     min='0' 
                                                                                     max='16'
                                                                                     value={actWallXSubU[activeWallNo][2]} 
                                                                                     step="1"
                                                                                     onChange={(e) =>{
                                                                                          if (e.target.value === '') {
                                                                                               e.target.value = 0
                                                                                          }
                                                                                          let lg = actWallXSubU[activeWallNo][0];
                                                                                          let med = actWallXSubU[activeWallNo][1];
                                                                                          let sm = parseFloat(e.target.value) + 0.1;
                                                                                          let tot;
                                                                                          let rWallXTemp;
                                                                                          if(scale === 'metric'){
                                                                                               tot = lg + (med/100) + (sm/1000);
                                                                                               rWallXTemp=[actWallX[0]/3, actWallX[1]/3, actWallX[2]/3, actWallX[3]/3];
                                                                                               rWallXTemp[activeWallNo] = tot/3;
                                                                                          }else if(scale === 'imperial'){
                                                                                               let ret_sm = sm/(12*16);
                                                                                               tot = lg + (med/12) + (ret_sm);
                                                                                               rWallXTemp=[actWallX[0]/10, actWallX[1]/10, actWallX[2]/10, actWallX[3]/10];
                                                                                               rWallXTemp[activeWallNo] = tot/10;
                                                                                          }
                                                                                          setWallDimTempX(rWallXTemp, unique);
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
                                                                 let fixDim;
                                                                 let defColor;
                                                                 let defTexture;
                                                                 if(fixCat === 'Door'){
                                                                      model = 'Exterior';
                                                                      fixDim = [0.068,0.667,0.3];
                                                                      defColor = 'white';
                                                                      defTexture = 'wood';
                                                                 }else{
                                                                      model = 'Standard';
                                                                      fixDim = [0.068,0.4,0.3];
                                                                      defColor = '#add8e6';
                                                                      defTexture = 'glass';
                                                                 }
                                                                 addFixture(
                                                                      activeWallNo, [fixCat, model], 
                                                                      unique, projInstance.key,
                                                                      fixDim, defColor, defTexture
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
                                                                 let fixDim;
                                                                 let defColor;
                                                                 let defTexture;
                                                                 if(fixCat === 'Door'){
                                                                      model = 'Interior';
                                                                      fixDim = [0.068,0.667,0.3];
                                                                      defColor = 'white';
                                                                      defTexture = 'wood';
                                                                 }else{
                                                                      model = 'Tall';
                                                                      fixDim = [0.068,0.5,0.2];
                                                                      defColor = '#add8e6';
                                                                      defTexture = 'glass';
                                                                 }
                                                                 addFixture(
                                                                      activeWallNo, [fixCat, model], 
                                                                      unique, fixDim,
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
                                   <div className='wall-footer'></div>
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