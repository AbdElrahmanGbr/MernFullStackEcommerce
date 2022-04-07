import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from "./Store"
import {positions, transitions, Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = { 
  position: positions.BOTTOM_CENTER,
  timeout: 5000,  // default value
  transition: transitions.SCALE
}

  
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>

      <App />
      </AlertProvider>
    </Provider>
   </BrowserRouter>,
  document.getElementById('root')
);

