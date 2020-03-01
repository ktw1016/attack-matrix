import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Application from './components/application.js';

ReactDOM.render(
  <BrowserRouter> <Application/> </BrowserRouter>,
  document.getElementById('root')
);