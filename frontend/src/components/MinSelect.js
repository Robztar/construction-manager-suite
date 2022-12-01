import { useStore } from '../hooks/objStore';

// Find a way to choose layout among:
     // Objects Menu
     // Models Menu
     // Room Menu

export const MinSelect = ({...props}) =>{
     const [
          setActive, 
          setResize,
          setAttrMenu,
     ] = useStore((state) => [
          state.setActive,
          state.setResize,
          state.setAttrMenu,
     ]);

     // let objInstance = objects.find(o => o.active === 'grid');
     let objInstance = props.instance;
     let unique = props.unique;

     return(
          <div 
               className='float min-select-cont'
               style={{'display': objInstance.active}}
          >
               <div 
                    className='min-select sel-resize'
                    onClick={() => {
                         setResize(unique);
                         setAttrMenu('');
                         setActive('');
                    }}
               >
                    <i class="fas fa-expand-alt"></i>
               </div>
               <div 
                    className='min-select sel-menu'
                    onClick={() => {
                         setAttrMenu(unique);
                         setResize('');
                         setActive('');
                    }}
               >
                    <i class="fas fa-bars"></i>
                    {/* <i class="fas fa-info"></i> */}
                    {/* <i class="fas fa-info-circle"></i> */}
               </div>
          </div>
     )
}