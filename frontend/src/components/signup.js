import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Signup = ()=>{
     const [name, setName] = useState('');

     return (
          <div className="gen-cont">
               {/* All this div will be restructured */}
               <div className="home-cont">
                    <h1 className="">Log-In</h1>
                    
                    <form className='' action="" method="post">
                         <input placeholder="Enter your name" className="" type="text" 
                              onChange={(event) => setName(event.target.value)}/>

                         <Link onClick={e => (!name) ? e.preventDefault() : null} to={`/edit?name=${name}`}>
                              <button className="" type="submit">Enter Now</button>
                         </Link>
                    </form>

                    
               </div>
          </div>
     );
}

export default Signup;