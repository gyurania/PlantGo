import React from 'react';
import Login from './views/loginView'
import Home from './views/homeView'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import axios from 'axios';
import SuccessLogin from './components/successLogin';
import WebcamCapture from './views/cameraView';
import { createStoreHook } from 'react-redux';
import store from './store/store'

const container = document.getElementById('root')!;
const root = createRoot(container);
axios.defaults.withCredentials = true;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/oauth/redirect' element={<SuccessLogin/>}/>
          <Route path='/camera' element={<WebcamCapture/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);