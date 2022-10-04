import React from 'react';
// npx create-react-app frontend

import ReactDOM from 'react-dom';

import './index.css';
import './css/style.css';

import App from './App';

import { BrowserRouter } from "react-router-dom"; 
// $ npm install react-router-dom@6

import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root'),
// );

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
