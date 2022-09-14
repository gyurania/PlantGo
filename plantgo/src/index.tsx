import React from 'react';
import Login from './views/loginView'
import Home from './views/homeView'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
import './index.css';
import axios from 'axios';
import SuccessLogin from './components/successlogin';

const container = document.getElementById('root')!;
const root = createRoot(container);
axios.defaults.withCredentials = true;

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/oauth/callback/kakao' element={<SuccessLogin/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);