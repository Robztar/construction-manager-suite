// npx create-react-app frontend
import React from 'react';

import ReactDOM from 'react-dom';
// $ npm install react-router-dom@6
import { BrowserRouter } from "react-router-dom";

import './css/style.css';
import './css/auth.css';
import './css/dash.css';
import './css/edit.css';
import './css/obj.css';

import App from './App';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root'),
// );