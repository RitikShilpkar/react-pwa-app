import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import QRScanner from './pages/Scanner';
import Stream from './pages/Stream';

import './App.css';
import PrivacyPolicy from './pages/PrivacyPolicy';
const App = () => {
  return (
    <BrowserRouter>


    
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/scanner" element={<QRScanner />}></Route>
        <Route path="/stream" element={<Stream />}></Route>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
