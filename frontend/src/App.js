import React from 'react';
import { Routes, Route} from "react-router-dom";

import Home from './Pages/Home';
import Edit from './Pages/Edit';
import NewEdit from './Pages/NewEdit';
// import Objects from './components/Objects';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

const App = ()=>(
  <Routes>
        <Route path="/" element={<Home />} />
        <Route path="edit" element={<Edit />} />
        <Route path="test" element={<NewEdit />} />
        {/* <Route path="experiment" element={<Objects />} /> */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
  </Routes>
);

export default App;
// npm run start (to  start the server)