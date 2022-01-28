import React from 'react';
import { Routes, Route} from "react-router-dom";

import Home from './components/home';
import Edit from './components/edit';
import Login from './components/login';
import Signup from './components/signup';
import Test from './components/test';
import FpOrbit from './components/fpOrbit';

const App = ()=>(
  <Routes>
        <Route path="/" element={<Home />} />
        <Route path="edit" element={<Edit />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="test" element={<Test />} /> 
        <Route path="fporbit" element={<FpOrbit />} /> 
        {/* Experimental component. Not for final product */}
  </Routes>
);

export default App;
// npm run start (to  start the server)
