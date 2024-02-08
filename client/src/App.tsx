import React, { useState } from 'react';

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from './components/Login';
import Register from './components/Register';
import Feed from './components/Feed';
import Video from './components/Video';
import Upload from './components/Upload';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (bool:boolean) => {
    setIsAuthenticated(bool);
  };
  return (
    <Router>

    <div>
      <Routes>

        <Route path='/' element={<Login/>} />
        <Route path='/feed' element={<Feed/>} />
        <Route path="/feed/:videoId" element={<Video />} />
        <Route path='/upload' element={<Upload/>} />
        <Route path='/register' element={<Register/>} />

      </Routes>
      </div>
    </Router>
  );
}

export default App;
