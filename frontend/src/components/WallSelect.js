// import { useStore } from '../hooks/objStore';

// // Find a way to choose layout among:
//      // Objects Menu
//      // Models Menu
//      // Room Menu

// export const MinSelect = ({...props}) =>{
//      const [
//           setWallctive,
//           setWallAttrMenu,
//           setFixMenu,
//      ] = useStore((state) => [
//           state.setWallActive,
//           state.setWallAttrMenu,
//           state.setFixMenu,
//      ]);

//      // let objInstance = objects.find(o => o.active === 'grid');
//      let objInstance = props.instance;
//      let unique = props.unique;
//      let wallNo = objInstance.activeWallNo;

//      return(
//           <div 
//                className='float min-select-cont'
//                style={{'display': objInstance.wallActive[wallNo]}}
//           >
//                <div 
//                     className='min-select sel-fixes'
//                     onClick={() => {
//                          setFixMenu(unique);
//                          setAttrMenu('');
//                          setActive('');
//                     }}
//                >
//                     <i className="fas fa-door-open"></i>
//                </div>
//                <div 
//                     className='min-select sel-menu'
//                     onClick={() => {
//                          setAttrMenu(unique);
//                          setResize('');
//                          setActive('');
//                     }}
//                >
//                     <i className="fas fa-bars"></i>
//                     {/* <i className="fas fa-info"></i> */}
//                     {/* <i className="fas fa-info-circle"></i> */}
//                </div>
//           </div>
//      )
// }