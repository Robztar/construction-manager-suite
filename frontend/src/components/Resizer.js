import { useStore } from '../hooks/objStore';

// Find a way to choose layout among:
     // Objects Menu
     // Models Menu
     // Room Menu

export const Resizer = ({...props}) =>{
     const [ objects, conversion, scale,
          setActive,
          setResize,
          setAttrMenu, 
          setDimTemp,
     ] = useStore((state) => [ state.objects, state.conv, state.scale,
          state.setActive,
          state.setResize,
          state.setAttrMenu,
          state.setDimTemp,
     ]);

     let objInstance = props.instance;
     let unique = props.unique;

     let dimensions;
     let actUnits;

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

     return(
          <div 
               className='float resizer-cont'
               style={{'display': objInstance.resize}}
          >
               <div className='float x-resizer'>
                    <div className='resizer-btn'>
                         <i class="fas fa-chevron-circle-left"></i>
                    </div>
                    <div className='resizer-mid-x'>
                         <i class="fas fa-arrows-alt-h"></i>
                    </div>
                    <div className='resizer-btn'>
                         <i class="fas fa-chevron-circle-right"></i>
                    </div>
               </div>
               <div className='float z-resizer'>
                    <div className='resizer-btn'>
                         <i class="fas fa-chevron-circle-up"></i>
                    </div>
                    <div className='resizer-mid-z'>
                         <i class="fas fa-arrows-alt-v"></i>
                    </div>
                    <div className='resizer-btn'>
                         <i class="fas fa-chevron-circle-down"></i>
                    </div>
               </div>
               <i 
                    class="float resizer-exit fas fa-times-circle"
                    onClick={()=>setResize('')}
               ></i>
          </div>
     )
}