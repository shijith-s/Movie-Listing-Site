import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {MovieProvider} from './React Context/MovieContext';

ReactDOM.render (
  <React.StrictMode>
    <MovieProvider>
      <App />
    </MovieProvider>
  </React.StrictMode>,
  document.getElementById ('root')
);
