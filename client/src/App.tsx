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

import SearchContainer from './components/SearchContainer';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (bool:boolean) => {
    setIsAuthenticated(bool);
  };
  return (
    <Router>

      <Routes>

        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/upload' element={<Upload/>} />
        <Route path="/feed" element={<>
          <SearchContainer />
          <Feed />
        </>} />
        <Route path="/feed/:videoId" element={<>
          <SearchContainer />
          <Video />
        </>} />

      </Routes>
    </Router>
  );
}

export default App;
