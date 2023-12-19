import React, { useState, useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import QRScanner from "./pages/Scanner";
import Stream from "./pages/Stream";

import "./App.css";
const App = () => {


  return (
    <BrowserRouter>
    <div> PI REACT PWA APP </div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/scanner" element={<QRScanner />}></Route>
        <Route path="/stream" element={<Stream />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
