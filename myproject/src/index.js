import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom';
import {Provider}from 'react-redux';
<<<<<<< HEAD
import {store}from './redux/store';
=======
import {store}from './store';
>>>>>>> 98aa6cad518c9e1a5152469123095d5b77b87b67
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


