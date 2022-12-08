import { useStore } from '../../hooks/objStore';

// Find a way to choose layout among:
     // Objects Menu
     // Models Menu
     // Room Menu

export const MinSelect = ({...props}) =>{
     const [
          setActive, 
          setResize,
          setAttrMenu,
          setFurnishMenu,
          setWallMenu,
     ] = useStore((state) => [
          state.setActive,
          state.setResize,
          state.setAttrMenu,
          state.setFurnishMenu,
          state.setWallMenu,
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
                         setFurnishMenu('');
                         setAttrMenu('');
                         setActive('');
                         setWallMenu('');
                    }}
               >
                    <i className="fas fa-expand-alt"></i>
               </div>
               <div 
                    className='min-select sel-furnish'
                    onClick={() => {
                         setFurnishMenu(unique);
                         setResize('');
                         setAttrMenu('');
                         setActive('');
                         setWallMenu('');
                    }}
               >
                    <i className="fas fa-couch"></i>
               </div>
               <div 
                    className='min-select sel-wall'
                    onClick={() => {
                         setWallMenu(unique);
                         setFurnishMenu('');
                         setResize('');
                         setAttrMenu('');
                         setActive('');
                    }}
               >
                    <i className="fas fa-th"></i>     
                    {/* <i className="fas fa-door-open"></i> */}
               </div>
               <div 
                    className='min-select sel-menu'
                    onClick={() => {
                         setAttrMenu(unique);
                         setFurnishMenu('');
                         setResize('');
                         setActive('');
                         setWallMenu('');
                    }}
               >
                    <i className="fas fa-bars"></i>
                    {/* <i className="fas fa-info"></i> */}
                    {/* <i className="fas fa-info-circle"></i> */}
               </div>
          </div>
     )
}