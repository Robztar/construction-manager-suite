// npx create-react-app frontend
import React from 'react';

import ReactDOM from 'react-dom';
// $ npm install react-router-dom@6
import { BrowserRouter } from "react-router-dom";

import './css/gen/style.css';
import './css/about/about.css';
import './css/dash/dash.css';
import './css/edit/edit.css';
import './css/obj/obj.css';

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