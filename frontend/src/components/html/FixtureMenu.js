import { useStore } from '../../hooks/objStore';
import { useState } from 'react';

export const FixTureMenu = ({...props}) =>{

     let fixId = props.fixId;
     let setFixEditMenu = props.setFixEditMenu;
     let setActiveFix = props.setActiveFix;
     let setFixTypeMenu = props.setFixTypeMenu;

     let objInstance = props.objInstance;
     let wallNo = props.wallNo;

     const [ fixtures, projects,
          changeFixColor, 
          changeFixTexture,
          removeFix,
          setFixDimTemp,
          setFixPos,
     ] = useStore((state) => [ state.fixtures, state.projects,
          state.changeFixColor,
          state.changeFixTexture,
          state.removeFix,
          state.setFixDimTemp,
          state.setFixPos,
     ]);

     const[fixOptions,setFixOptions] = useState(false);   // Textures / Colors Menu
     const[fixTextureMenu,setFixTextureMenu] = useState(false);   // Textures / Colors Menu
     const[matType,setMatType] = useState(false);    // Material Type for Menu
     const[fixPropMenu,setFixPropMenu] = useState(false);    // Properties Menu
     const[fixPosMenu,setFixPosMenu] = useState(false);    // Position Menu


     let fixInstance = fixtures.find(o => o.key === fixId);

     if(fixInstance){
          let type = fixInstance.type;
          let actUnits;
          let actSubUnits;
          let fixPos = fixInstance.pos;
          let projInstance = projects.find(p => p.key === objInstance.projId);
          let scale = projInstance.scale;
          let conversion = projInstance.conversion;

          let dimensions = [
               fixInstance.dimTemp[0]*conversion,
               fixInstance.dimTemp[1]*conversion,
               fixInstance.dimTemp[2]*conversion
          ];
          if(scale === 'metric'){
               actUnits = [dimensions[0]/4,dimensions[1]/4,dimensions[2]/4];
               actSubUnits = [
                    // X-axis
                    [
                         Math.floor(actUnits[0]), //metre
                         Math.floor((actUnits[0] % 1) * 100),   //cm
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

          return(
               <div className='fix-li'>
                    <div className='fix-head'>
                         <div className='fix-type'>Edit {type[0]}</div>
                         <div className='fix-done'
                              onClick={(e) =>{
                                   e.stopPropagation();
                                   setFixTypeMenu(true);
                                   setFixEditMenu(false);
                                   setActiveFix('');
                                   setFixTextureMenu(false);
                                   setFixPropMenu(false);
                                   setFixPosMenu(false);
                              }}
                         ><i className="fas fa-times-circle"></i></div>
                    </div>
                    
                    <div className='fix-opts'>
                         {/* Fixture Texture */}
                         <div 
                              className={`fixture 
                                   ${ fixTextureMenu || fixOptions  ? 'active' : ''}
                                   ${ fixPropMenu || fixPosMenu ? 'inactive' : ''}
                              `}
                         >
                              {(() =>{
                                   if(fixOptions){
                                        return(
                                             <div className='fix-texture-li'>
                                                  <div className='fix-type-row'
                                                       onClick={(e) =>{
                                                            e.stopPropagation();
                                                            setFixOptions(false);
                                                            setFixTextureMenu(true);
                                                            setMatType('Wood');
                                                       }}
                                                  >Wood</div>
                                                  <div className='fix-type-row'
                                                       onClick={(e) =>{
                                                            e.stopPropagation();
                                                            setFixOptions(false);
                                                            setFixTextureMenu(true);
                                                            setMatType('Glass');
                                                       }}
                                                  >Glass</div>
                                                  <div className='fix-type-row cancel'
                                                       onClick={(e) =>{
                                                            e.stopPropagation();
                                                            setFixOptions(false);
                                                       }}
                                                  >Cancel</div>
                                             </div>
                                        );
                                   }
                                   if(fixTextureMenu){
                                        if(matType === 'Wood'){
                                             return(
                                                  <div className='fix-texture-li'>
                                                       <div className='fix-type-head'> 
                                                            <div className='fix-type-title'>Wood</div> 
                                                            <div className='fix-cancel-row'
                                                                 onClick={(e) =>{
                                                                      e.stopPropagation();
                                                                      setFixTextureMenu(false);
                                                                 }}
                                                            >Cancel</div>
                                                       </div>
                                                       {/* Wood Row 1 */}
                                                       <div className='fix-texture-row'>
                                                            <div 
                                                                 className='fix-texture-item t-wood'
                                                                 onClick={(e) =>{
                                                                      e.stopPropagation();
                                                                      let fixColor = 'white';
                                                                      changeFixColor(fixColor, fixId);
                                                                      changeFixTexture('wood', fixId);
                                                                      setFixTextureMenu(false);
                                                                 }}
                                                            ></div>
                                                            <div 
                                                                 className='fix-texture-item t-worn-wood'
                                                                 onClick={(e) =>{
                                                                      e.stopPropagation();
                                                                      let fixColor = 'white';
                                                                      changeFixColor(fixColor, fixId);
                                                                      changeFixTexture('wornWood', fixId);
                                                                      setFixTextureMenu(false);
                                                                 }}
                                                            ></div>
                                                       </div>
                                                       {/* Wood Row 2 */}
                                                       <div className='fix-texture-row'>
                                                            <div 
                                                                 className='fix-texture-item t-plywood'
                                                                 onClick={(e) =>{
                                                                      e.stopPropagation();
                                                                      let fixColor = 'white';
                                                                      changeFixColor(fixColor, fixId);
                                                                      changeFixTexture('plywood', fixId);
                                                                      setFixTextureMenu(false);
                                                                 }}
                                                            ></div>
                                                            <div 
                                                                 className='fix-texture-item t-laminate'
                                                                 onClick={(e) =>{
                                                                      e.stopPropagation();
                                                                      let fixColor = 'white';
                                                                      changeFixColor(fixColor, fixId);
                                                                      changeFixTexture('laminate', fixId);
                                                                      setFixTextureMenu(false);
                                                                 }}
                                                            ></div>
                                                       </div>
                                                  </div>
                                             );
                                        }
                                        if(matType === 'Glass'){
                                             return(
                                                  <div className='fix-texture-li'>
                                                       <div className='fix-type-head'> 
                                                            <div className='fix-type-title'>Glass</div> 
                                                            <div className='fix-cancel-row'
                                                                 onClick={(e) =>{
                                                                      e.stopPropagation();
                                                                      setFixTextureMenu(false);
                                                                 }}
                                                            >Cancel</div>
                                                       </div>
                                                       {/* Glass Row 1 */}
                                                       <div className='fix-texture-row'>
                                                            <div 
                                                                 className='fix-glass'
                                                                 style={{'background': '#add8e6'}}
                                                                 onClick={(e) =>{
                                                                      e.stopPropagation();
                                                                      let fixColor = '#add8e6';
                                                                      changeFixColor(fixColor, fixId);
                                                                      changeFixTexture('glass', fixId);
                                                                      setFixTextureMenu(false);
                                                                 }}
                                                            ></div>
                                                            <div 
                                                                 className='fix-glass'
                                                                 style={{'background': 'black'}}
                                                                 onClick={(e) =>{
                                                                      e.stopPropagation();
                                                                      let fixColor = 'black';
                                                                      changeFixColor(fixColor, fixId);
                                                                      changeFixTexture('glass', fixId);
                                                                      setFixTextureMenu(false);
                                                                 }}
                                                            ></div>
                                                       </div>
                                                       {/* Glass Row 2 */}
                                                       <div className='fix-texture-row'>
                                                            <div 
                                                                 className='fix-glass'
                                                                 style={{'background': 'red'}}
                                                                 onClick={(e) =>{
                                                                      e.stopPropagation();
                                                                      let fixColor = 'red';
                                                                      changeFixColor(fixColor, fixId);
                                                                      changeFixTexture('glass', fixId);
                                                                      setFixTextureMenu(false);
                                                                 }}
                                                            ></div>
                                                            <div 
                                                                 className='fix-glass'
                                                                 style={{'background': 'orange'}}
                                                                 onClick={(e) =>{
                                                                      e.stopPropagation();
                                                                      let fixColor = 'orange';
                                                                      changeFixColor(fixColor, fixId);
                                                                      changeFixTexture('glass', fixId);
                                                                      setFixTextureMenu(false);
                                                                 }}
                                                            ></div>
                                                       </div>
                                                  </div>
                                             );
                                        }
                                   }else{
                                        return(
                                             <label 
                                                  className='fix-n'
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       setFixOptions(true);
                                                  }}
                                             >{type[0]} Texture</label>
                                        );
                                   }
                              }) () }
                         </div>
                         {/* Fixture Dimensions */}
                         <div 
                              className={`fixture 
                                   ${ fixPropMenu ? 'active' : ''}
                                   ${ fixTextureMenu || fixOptions || fixPosMenu ? 'inactive' : ''}
                              `}
                         >
                              {(() =>{ 
                                   if(fixPropMenu){
                                        return(
                                             <div className='fix-props-li'>
                                                  <div className='fix-props-head'>
                                                       <div className='props-type'>Properties</div>
                                                       <div className='props-done'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 setFixPropMenu(false);
                                                            }}
                                                       ><i className="fas fa-check-circle"></i></div>
                                                  </div>
                                                  
                                                  <div className='props-opts'>
                                                       <div className='prop'>
                                                            <label className='prop-n'>Height</label>
                                                            <div className='prop-fields'>
                                                                 <input 
                                                                      className='prop-input'
                                                                      id="height-l"
                                                                      type="number"
                                                                      min='0' 
                                                                      value={actSubUnits[1][0]}
                                                                      step="1"
                                                                      onChange={(e) =>{
                                                                           if (e.target.value === '') {
                                                                                e.target.value = 0
                                                                           }
                                                                           let lg = parseInt(e.target.value);
                                                                           let med = actSubUnits[1][1]
                                                                           let sm = actSubUnits[1][2] + 0.1;
                                                                           let tot;
                                                                           let rDimTemp;
                                                                           if(scale === 'metric'){
                                                                                tot = lg + (med/100) + (sm/1000);
                                                                                // console.log("Width is "+lg+"m, "+med+"cm, "+sm+"mm.");
                                                                                // console.log("Total Width is " + tot);
                                                                                rDimTemp=[actUnits[0]/3, tot/3, actUnits[2]/3];
                                                                           }else if(scale === 'imperial'){
                                                                                let ret_sm = sm/(12*16);
                                                                                tot = lg + (med/12) + (ret_sm);
                                                                                // console.log("Width is "+lg+"ft, "+med+" and "+sm+"/16 in.");
                                                                                // console.log("Total Width is " + tot);
                                                                                rDimTemp=[actUnits[0]/10, tot/10,actUnits[2]/10];
                                                                           }
                                                                           setFixDimTemp(rDimTemp, fixId);
                                                                      }}
                                                                 />
                                                                 <input 
                                                                      className='prop-input'
                                                                      id="height-m"
                                                                      type="number"
                                                                      min='0' 
                                                                      max='100'
                                                                      value={actSubUnits[1][1]}
                                                                      step="1"
                                                                      onChange={(e) =>{
                                                                           if (e.target.value === '') {
                                                                                e.target.value = 0
                                                                           }
                                                                           let lg = actSubUnits[1][0];
                                                                           let med = parseInt(e.target.value);
                                                                           let sm = actSubUnits[1][2] + 0.1;
                                                                           let tot;
                                                                           let rDimTemp;
                                                                           if(scale === 'metric'){
                                                                                tot = lg + (med/100) + (sm/1000);
                                                                                rDimTemp=[actUnits[0]/3, tot/3, actUnits[2]/3];
                                                                           }else if(scale === 'imperial'){
                                                                                let ret_sm = sm/(12*16);
                                                                                tot = lg + (med/12) + (ret_sm);
                                                                                rDimTemp=[actUnits[0]/10, tot/10,actUnits[2]/10];
                                                                           }
                                                                           setFixDimTemp(rDimTemp, fixId);
                                                                      }}
                                                                 />
                                                                 <input 
                                                                      className='prop-input'
                                                                      type="number"
                                                                      id="height-s"
                                                                      min='0' 
                                                                      max='16'
                                                                      value={actSubUnits[1][2]} 
                                                                      step="1"
                                                                      onChange={(e) =>{
                                                                           if (e.target.value === '') {
                                                                                e.target.value = 0
                                                                           }
                                                                           let lg = actSubUnits[1][0];
                                                                           let med = actSubUnits[1][1];
                                                                           let sm = parseFloat(e.target.value) + 0.1;
                                                                           let tot;
                                                                           let rDimTemp;
                                                                           if(scale === 'metric'){
                                                                                tot = lg + (med/100) + (sm/1000);
                                                                                rDimTemp=[actUnits[0]/3, tot/3, actUnits[2]/3];
                                                                           }else if(scale === 'imperial'){
                                                                                let ret_sm = sm/(12*16);
                                                                                tot = lg + (med/12) + (ret_sm);
                                                                                rDimTemp=[actUnits[0]/10, tot/10,actUnits[2]/10];
                                                                           }
                                                                           setFixDimTemp(rDimTemp, fixId);
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
                                                            <label className='prop-n'>Width</label>
                                                            <div className='prop-fields'>
                                                                 <input 
                                                                      className='prop-input'
                                                                      id="wid-l"
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
                                                                           setFixDimTemp(rDimTemp,fixId);
                                                                      }}
                                                                 />
                                                                 <input 
                                                                      className='prop-input'
                                                                      id="wid-m"
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
                                                                           setFixDimTemp(rDimTemp, fixId);
                                                                      }}
                                                                 />
                                                                 <input 
                                                                      className='prop-input'
                                                                      type="number"
                                                                      id="wid-s"
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
                                                                           setFixDimTemp(rDimTemp, fixId);
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
                                        );
                                   }else{
                                        return(
                                             <label 
                                                  className='fix-n'
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       setFixPropMenu(true);
                                                  }}
                                             >{type[0]} Dimensions</label>
                                        );
                                   }
                              }) () }
                              
                         </div>
                         {/* Fixture Position */}
                         <div 
                              className={`fixture 
                                   ${ fixPosMenu ? 'active' : ''}
                                   ${ fixTextureMenu || fixOptions || fixPropMenu ? 'inactive' : ''}

                              `}
                         >
                              {(() =>{ 
                                   if(fixPosMenu){
                                        return(
                                             <div className='fix-props-li'>
                                                  <div className='fix-props-head'>
                                                       <div className='props-type'>Position</div>
                                                       <div className='props-done'
                                                            onClick={(e) =>{
                                                                 e.stopPropagation();
                                                                 setFixPosMenu(false);
                                                            }}
                                                       ><i className="fas fa-check-circle"></i></div>
                                                  </div>
                                                  
                                                  <div className='props-opts'>
                                                       {type[0] === 'Door'? null :
                                                            <div className='fix-pos'>
                                                                 <label className='prop-n'>Up-Down</label>
                                                                 <div className='fix-pos-fields'>
                                                                      <input 
                                                                           className='fix-pos-input'
                                                                           id="ud"
                                                                           type="number"
                                                                           min={Math.floor(-(objInstance.wallDimTempY[wallNo]*conversion)/2)}
                                                                           max={Math.ceil((objInstance.wallDimTempY[wallNo]*conversion)/2)} 
                                                                           value={fixPos[1]}
                                                                           step="0.1"
                                                                           onChange={(e) =>{
                                                                                if (e.target.value === '') {
                                                                                     e.target.value = 0
                                                                                }
                                                                                let nPos = e.target.value;
                                                                                setFixPos([fixPos[0],nPos,fixPos[2]], fixId);
                                                                           }}
                                                                      />
                                                                 </div>
                                                                 <div className='fix-pos-names'>units</div>
                                                            </div>
                                                       }
                                                       <div className='fix-pos'>
                                                            <label className='prop-n'>Side-to-Side</label>
                                                            <div className='fix-pos-fields'>
                                                                 <input 
                                                                      className='fix-pos-input'
                                                                      id="s2s"
                                                                      type="number"
                                                                      min={Math.floor(-(objInstance.wallDimTempZ[wallNo]*conversion)/2)}
                                                                      max={Math.ceil((objInstance.wallDimTempZ[wallNo]*conversion)/2)} 
                                                                      value={fixPos[2]}
                                                                      step="0.1"
                                                                      onChange={(e) =>{
                                                                           if (e.target.value === '') {
                                                                                e.target.value = 0
                                                                           }
                                                                           let nPos = e.target.value;
                                                                           setFixPos([fixPos[0],fixPos[1], nPos], fixId);
                                                                      }}
                                                                 />
                                                            </div>
                                                            <div className='fix-pos-names'>units</div>
                                                       </div>
                                                  </div>
                                             </div>
                                        );
                                   }else{
                                        return(
                                             <label 
                                                  className='fix-n'
                                                  onClick={(e) =>{
                                                       e.stopPropagation();
                                                       setFixPosMenu(true);
                                                  }}
                                             >{type[0]} Position</label>
                                        );
                                   }
                              }) () }
                              
                         </div>
                         {/* Remove Fixture */}
                         <div 
                              className={`del-fixture 
                                   ${ fixPropMenu || fixTextureMenu || fixOptions || fixPosMenu ? 'inactive' : ''}
                              `}
                              onClick={(e) =>{
                                   e.stopPropagation();
                                   setFixTypeMenu(true);
                                   setFixEditMenu(false);
                                   setActiveFix('');
                                   removeFix(fixId);
                              }}
                         >
                              <label className='fix-n'>Remove</label>
                              <i className="fas fa-minus-circle"></i>
                         </div>
                    </div>
               </div>
               
          )
     }else{
          return null
     }
}

