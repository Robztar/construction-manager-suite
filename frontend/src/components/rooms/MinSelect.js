import { useStore } from '../../hooks/objStore';

export const MinSelect = ({...props}) =>{
     const [
          setActive, 
          setResize,
          setAttrMenu,
          setWallMenu,
     ] = useStore((state) => [
          state.setActive,
          state.setResize,
          state.setAttrMenu,
          state.setWallMenu,
     ]);

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
                         setWallMenu('');
                    }}
               >
                    <i className="fas fa-expand-alt"></i>
               </div>
               <div 
                    className='min-select sel-wall'
                    onClick={() => {
                         setWallMenu(unique);
                         setResize('');
                         setAttrMenu('');
                         setActive('');
                    }}
               >
                    <i className="fas fa-th"></i>
               </div>
               <div 
                    className='min-select sel-menu'
                    onClick={() => {
                         setAttrMenu(unique);
                         setResize('');
                         setActive('');
                         setWallMenu('');
                    }}
               >
                    <i className="fas fa-bars"></i>
               </div>
          </div>
     )
}