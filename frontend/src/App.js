import React from 'react';
import { Routes, Route} from "react-router-dom";

import Home from './Pages/Home';
import Edit from './Pages/Edit';
import NewEdit from './Pages/NewEdit';
import Dash from './Pages/Dash';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

const App = ()=>(
  <Routes>
        <Route path="/" element={<Home />} />
        <Route path="edit" element={<Edit />} />
        <Route path="test" element={<NewEdit />} />
        <Route path="dash" element={<Dash />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
  </Routes>
);

export default App;
// npm run start (to  start the server)